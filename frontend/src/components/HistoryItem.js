import React, {useState} from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {oneDark} from "react-syntax-highlighter/dist/esm/styles/prism";

const HistoryItem = ({item}) => {
    const [expanded, setExpanded] = useState(false);
    const [description, codeSuggestion] = item.result.split("```");

    return (
        <div className="mb-4 border rounded-lg bg-white shadow">
            <button
                onClick={() => setExpanded(!expanded)}
                className="w-full text-left px-4 py-3 bg-indigo-100 hover:bg-indigo-200 font-semibold rounded-t"
            >
                {item.title} —{" "}
                <span className="text-sm text-gray-600">
          {new Date(item.created_at).toLocaleString()}
        </span>
            </button>

            {expanded && (
                <div className="p-4 space-y-4">
                    <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-1">
                            Gönderilen Kod:
                        </h3>
                        <SyntaxHighlighter language={item.language} style={oneDark} className="rounded">
                            {item.code}
                        </SyntaxHighlighter>
                    </div>

                    <div>
                        <h3 className="text-md font-semibold text-gray-700 mb-1">
                            AI Açıklaması:
                        </h3>
                        <MarkdownRenderer>{description}</MarkdownRenderer>
                    </div>

                    {codeSuggestion && (
                        <details className="mt-2">
                            <summary className="cursor-pointer text-sm text-blue-600 hover:underline">
                                Kod Önerisini Göster
                            </summary>
                            <SyntaxHighlighter
                                language={item.language}
                                style={oneDark}
                                customStyle={{borderRadius: "0.5rem"}}
                            >
                                {codeSuggestion}
                            </SyntaxHighlighter>
                        </details>
                    )}
                </div>
            )}
        </div>
    );
};

export default HistoryItem;
