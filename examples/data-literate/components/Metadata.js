

export default function MetaData({ title, author, description }) {
    return (
        <header>
            <div className="mb-6">
                <h1>{title}</h1>
                {author && (
                    <div className="-mt-6"><p className="opacity-60 pl-1">{author}</p></div>
                )}
                {description && (
                    <p className="description">{description}</p>
                )}
            </div>
        </header>
    )

}