// components/Question.tsx
import { useRouter } from 'next/navigation';
import { Key, useEffect, useState } from 'react';


const TestDashboard: React.FC<{ activeTest: any, onQuestionSelected: (question : any) => Promise<void> }> = (props) => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const router = useRouter();

  if (props.activeTest.length === 0) {
    return (
      <div className="p-8">
        no test selected
      </div>
    )
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl mb-4">{props.activeTest.question}</h2>
      <ul>
        {props.activeTest.options.map((option: any, index: Key) => (
          <li key={index} className="mb-2">
            <button className="w-full p-2 bg-gray-200 rounded-md hover:bg-gray-300" onClick={() => {}}></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestDashboard;
