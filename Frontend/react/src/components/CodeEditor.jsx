import { useRef, useEffect, useState } from 'react';
import Editor from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import axios from 'axios';

export default function CodeEditor({ roomId }) {
    const editorRef = useRef(null);
    const providerRef = useRef(null);
    const ydocRef = useRef(null);
    const bindingRef = useRef(null);

    const [initialCode, setInitialCode] = useState('// Loading...');

    const [output, setOutput] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);

    // NEW FUNCTION: Send code to the backend
    const handleRunCode = async () => {
        if (!editorRef.current) return;

        setIsExecuting(true);
        setOutput('Executing in secure container...');

        // Grab the current text directly from Monaco
        const currentCode = editorRef.current.getValue();

        try {
            const response = await axios.post('http://localhost:5000/api/execute', {
                code: currentCode,
                language: 'javascript'
            });

            if (response.data.error) {
                setOutput(`⚠️ Error: ${response.data.error}`);
            } else {
                setOutput(response.data.output || 'Code executed successfully with no output.');
            }
        } catch (error) {
            setOutput('⚠️ Failed to connect to execution server.');
        } finally {
            setIsExecuting(false);
        }
    };

    // Fetch initial code from MongoDB
    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/documents/${roomId}`);
                setInitialCode(response.data.content);
            } catch (error) {
                console.error("Error fetching document:", error);
            }
        };
        fetchDocument();
    }, [roomId]);

    function handleEditorWillMount(monaco) {
        monaco.editor.setTheme('vs-dark');
    }

    // Handle Monaco Initialization and Y.js Binding
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;

        monaco.editor.setTheme('vs-dark');

        // 1. Initialize Y.js Document
        const ydoc = new Y.Doc();
        ydocRef.current = ydoc;

        // 2. Connect to the WebSocket Server
        const provider = new WebsocketProvider(
            'ws://localhost:5000',
            roomId,
            ydoc
        );
        providerRef.current = provider;

        // 3. Get the shared text type
        const ytext = ydoc.getText('monaco');

        // 4. Bind Y.js to Monaco
        bindingRef.current = new MonacoBinding(
            ytext,
            editorRef.current.getModel(),
            new Set([editorRef.current]),
            provider.awareness
        );

        // Optional: Assign a random color and name to this user's cursor
        provider.awareness.setLocalStateField('user', {
            name: `User ${Math.floor(Math.random() * 100)}`,
            color: '#' + Math.floor(Math.random() * 16777215).toString(16)
        });
    }

    // Cleanup on unmount (Crucial to prevent duplicate connections)
    useEffect(() => {
        return () => {
            if (bindingRef.current) bindingRef.current.destroy();
            if (providerRef.current) providerRef.current.disconnect();
            if (ydocRef.current) ydocRef.current.destroy();
        };
    }, []);

    return (
        <div className="h-screen w-screen grid grid-rows-[50px_1fr_200px] bg-[#1e1e1e] overflow-hidden">
            {/* HEADER DIV */}
            <div className="flex items-center justify-between px-4 bg-[#252526] text-[#cccccc] border-b border-[#333] text-sm font-sans">
                <div>
                    <strong className="text-white">Room:</strong> {roomId}
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <strong>Status:</strong> Live
                </div>
                <button
                    onClick={handleRunCode}
                    disabled={isExecuting}
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                    {isExecuting ? 'Running...' : 'Run Code'}
                </button>
            </div>
            {/* EDITOR DIV */}
            <div className='w-full h-full min-h-0 relative'>
                <Editor
                    height="100%"
                    width="100%"
                    theme="vs-dark"
                    language="javascript"
                    value={initialCode}
                    beforeMount={handleEditorWillMount}
                    onMount={handleEditorDidMount}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: 'on',
                        automaticLayout: true,
                    }}
                />
            </div>

            {/* CONSOLE DIV */}
            <div className="w-full h-full min-h-0 bg-[#1e1e1e] p-4 font-mono text-sm overflow-y-auto">
                <div className="text-gray-500 mb-2 font-bold uppercase text-xs tracking-widest">Terminal Output</div>
                <pre className="text-gray-300 whitespace-pre-wrap">{output}</pre>
            </div>

        </div>
    );
}