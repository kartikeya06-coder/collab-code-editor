import CodeEditor from './components/CodeEditor';

function App() {
  // Hardcoding a room ID for testing. 
  // In a real app, you would use React Router to get this from the URL (e.g., /room/123)
  const TEST_ROOM_ID = "interview-room-alpha";

  return (
    <div style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      <CodeEditor roomId={TEST_ROOM_ID} />
    </div>
  );
}

export default App;