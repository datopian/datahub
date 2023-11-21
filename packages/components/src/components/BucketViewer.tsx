import { useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { XMLParser } from 'fast-xml-parser';

export interface BucketViewerProps {
  domain: string;
  suffix?: string;
}

interface BucketResponse {
  ListBucketResult: ListBucketResult;
}

interface ListBucketResult {
  Name: string;
  Prefix: string;
  MaxKeys: number;
  IsTruncated: boolean;
  Contents: Content[];
  Marker: string;
  NextMarker: string;
}

interface Content {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: number;
  StorageClass: StorageClass;
  Owner?: Owner;
  Type: Type;
}

interface Owner {
  ID: number;
  DisplayName: number;
}

enum StorageClass {
  Standard = 'STANDARD',
}

enum Type {
  Normal = 'Normal',
}

export function BucketViewer({ domain, suffix }: BucketViewerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bucket, setBucket] = useState<BucketResponse>();
  suffix = suffix ?? '/';

  useEffect(() => {
    setIsLoading(true);
    fetch(`${domain}${suffix}`)
      .then((res) => res.text())
      .then((res) => {
        const parsedXml: BucketResponse = new XMLParser().parse(res);
        let {
          ListBucketResult: { Contents },
        } = parsedXml;
        Contents = Contents ?? [];
        parsedXml.ListBucketResult.Contents = Array.isArray(Contents)
          ? Contents
          : [Contents];
        setBucket(parsedXml);
      })
      .finally(() => setIsLoading(false));
  }, [domain, suffix]);
  return isLoading ? (
    <div className="w-full flex items-center justify-center h-[300px]">
      <LoadingSpinner />
    </div>
  ) : bucket ? (
    <>
      {...bucket?.ListBucketResult?.Contents?.map((c, i) => (
        <ul
          onClick={() => {
            const anchorId = `download_anchor_${i}`;
            const a: HTMLAnchorElement =
              (document.getElementById(anchorId) as HTMLAnchorElement | null) ??
              document.createElement('a');
            a.id = anchorId;
            if (a.download) a.click();
            else {
              setIsLoading(true);
              fetch(`${domain}${suffix}${c.Key}`)
                .then((res) => res.blob())
                .then((res) => {
                  a.href = URL.createObjectURL(res);
                  a.download = res.name ?? c.ETag.replace(/\"/g, '');
                  document.body.appendChild(a);
                  a.click();
                })
                .finally(() => setIsLoading(false));
            }
          }}
          key={i}
          className="mb-2 border-b-[2px] border-b-[red] hover:cursor-pointer"
        >
          <li>{c.Key}</li>
          <li>{c.ETag}</li>
          <li>{c.Owner?.DisplayName}</li>
          <li>{c.Owner?.ID}</li>
          <li>{c.Size}</li>
          <li>{c.StorageClass}</li>
          <li>{c.Type}</li>
          <li>{c.LastModified}</li>
        </ul>
      ))}
    </>
  ) : null;
}
