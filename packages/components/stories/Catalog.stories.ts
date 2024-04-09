import type { Meta, StoryObj } from '@storybook/react';

import { Catalog } from '../src/components/Catalog';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta = {
  title: 'Components/Catalog',
  component: Catalog,
  tags: ['autodocs'],
  argTypes: {
    datasets: {
      description:
        "Array of items to be displayed on the searchable list. Must have the following properties: \n\n \
`_id`: item's unique id \n\n \
`url_path`: href of the item \n\n \
`metadata`: object with a `title` property, that will be displayed as the title of the item, together with any other custom fields that might or not be faceted.",
    },
    facets: {
      description:
        "Array of strings, which are name of properties in the datasets' `metadata`, which are going to be faceted.",
    },
  },
};

export default meta;

type Story = StoryObj<{ datasets: any; facets: string[] }>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const WithoutFacets: Story = {
  name: 'Catalog without facets',
  args: {
    datasets: [
      {
        _id: '07026b22d49916754df1dc8ffb9ccd1c31878aae',
        url_path: 'dataset-4',
        metadata: {
          title: 'Detecting Abusive Albanian',
        },
      },
      {
        _id: '42c86cf3c4fbbab11d91c2a7d6dcb8f750bc4e19',
        url_path: 'dataset-1',
        metadata: {
          title: 'AbuseEval v1.0',
        },
      },
      {
        _id: '80001dd32a752421fdcc64e91fbd237dc31d6bb3',
        url_path: 'dataset-2',
        metadata: {
          title:
            'Abusive Language Detection on Arabic Social Media (Al Jazeera)',
        },
      },
      {
        _id: '96649d05d8193f4333b10015af76c6562971bd8c',
        url_path: 'dataset-3',
        metadata: {
          title: 'CoRAL: a Context-aware Croatian Abusive Language Dataset',
        },
      },
    ],
  },
};
export const WithFacets: Story = {
  name: 'Catalog with facets',
  args: {
    datasets: [
      {
        _id: '07026b22d49916754df1dc8ffb9ccd1c31878aae',
        url_path: 'dataset-4',
        metadata: {
          title: 'Detecting Abusive Albanian',
          'link-to-publication': 'https://arxiv.org/abs/2107.13592',
          'link-to-data': 'https://doi.org/10.6084/m9.figshare.19333298.v1',
          'task-description':
            'Hierarchical (offensive/not; untargeted/targeted; person/group/other)',
          'details-of-task':
            'Detect and categorise abusive language in social media data',
          'size-of-dataset': 11874,
          'percentage-abusive': 13.2,
          language: 'Albanian',
          'level-of-annotation': ['Posts'],
          platform: ['Instagram', 'Youtube'],
          medium: ['Text'],
          reference:
            'Nurce, E., Keci, J., Derczynski, L., 2021. Detecting Abusive Albanian. arXiv:2107.13592',
        },
      },
      {
        _id: '42c86cf3c4fbbab11d91c2a7d6dcb8f750bc4e19',
        url_path: 'dataset-1',
        file_path: 'content/dataset-1/index.md',
        metadata: {
          title: 'AbuseEval v1.0',
          'link-to-publication':
            'http://www.lrec-conf.org/proceedings/lrec2020/pdf/2020.lrec-1.760.pdf',
          'link-to-data': 'https://github.com/tommasoc80/AbuseEval',
          'task-description':
            'Explicitness annotation of offensive and abusive content',
          'details-of-task':
            'Enriched versions of the OffensEval/OLID dataset with the distinction of explicit/implicit offensive messages and the new dimension for abusive messages. Labels for offensive language: EXPLICIT, IMPLICT, NOT; Labels for abusive language: EXPLICIT, IMPLICT, NOTABU',
          'size-of-dataset': 14100,
          'percentage-abusive': 20.75,
          language: 'English',
          'level-of-annotation': ['Tweets'],
          platform: ['Twitter'],
          medium: ['Text'],
          reference:
            'Caselli, T., Basile, V., Jelena, M., Inga, K., and Michael, G. 2020. "I feel offended, don’t be abusive! implicit/explicit messages in offensive and abusive language". The 12th Language Resources and Evaluation Conference (pp. 6193-6202). European Language Resources Association.',
        },
      },
      {
        _id: '80001dd32a752421fdcc64e91fbd237dc31d6bb3',
        url_path: 'dataset-2',
        file_path: 'content/dataset-2/index.md',
        metadata: {
          title:
            'Abusive Language Detection on Arabic Social Media (Al Jazeera)',
          'link-to-publication': 'https://www.aclweb.org/anthology/W17-3008',
          'link-to-data':
            'http://alt.qcri.org/~hmubarak/offensive/AJCommentsClassification-CF.xlsx',
          'task-description':
            'Ternary (Obscene, Offensive but not obscene, Clean)',
          'details-of-task': 'Incivility',
          'size-of-dataset': 32000,
          'percentage-abusive': 0.81,
          language: 'Arabic',
          'level-of-annotation': ['Posts'],
          platform: ['AlJazeera'],
          medium: ['Text'],
          reference:
            'Mubarak, H., Darwish, K. and Magdy, W., 2017. Abusive Language Detection on Arabic Social Media. In: Proceedings of the First Workshop on Abusive Language Online. Vancouver, Canada: Association for Computational Linguistics, pp.52-56.',
        },
      },
      {
        _id: '96649d05d8193f4333b10015af76c6562971bd8c',
        url_path: 'dataset-3',
        file_path: 'content/dataset-3/index.md',
        metadata: {
          title: 'CoRAL: a Context-aware Croatian Abusive Language Dataset',
          'link-to-publication':
            'https://aclanthology.org/2022.findings-aacl.21/',
          'link-to-data':
            'https://github.com/shekharRavi/CoRAL-dataset-Findings-of-the-ACL-AACL-IJCNLP-2022',
          'task-description':
            'Multi-class based on context dependency categories (CDC)',
          'details-of-task': 'Detectioning CDC from abusive comments',
          'size-of-dataset': 2240,
          'percentage-abusive': 100,
          language: 'Croatian',
          'level-of-annotation': ['Posts'],
          platform: ['Posts'],
          medium: ['Newspaper Comments'],
          reference:
            'Ravi Shekhar, Mladen Karan and Matthew Purver (2022). CoRAL: a Context-aware Croatian Abusive Language Dataset. Findings of the ACL: AACL-IJCNLP.',
        },
      },
    ],
    facets: ['language', 'platform'],
  },
};
