import ReactMarkdown from "react-markdown";

const MarkdownRenderer = ({children}) => (
    <ReactMarkdown
        components={{
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold my-2" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl font-semibold my-2" {...props} />,
            p: ({node, ...props}) => <p className="mb-2 leading-relaxed" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-2" {...props} />,
            li: ({node, ...props}) => <li className="mb-1" {...props} />,
            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
            em: ({node, ...props}) => <em className="italic" {...props} />,
        }}
    >
        {children}
    </ReactMarkdown>
);

export default MarkdownRenderer;
