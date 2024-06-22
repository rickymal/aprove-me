"use client"
// pages/test/[id].tsx
import { useSearchParams } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import TestDashboard from '../../components/Question';
import { useEffect, useState } from 'react';

// const questions = {
//   1: {
//     question: 'Qual é a capital da França?',
//     options: ['Paris', 'Londres', 'Roma'],
//     next: '/test/2'
//   },
//   2: {
//     question: 'Qual é a capital da Itália?',
//     options: ['Paris', 'Londres', 'Roma'],
//     next: '/test/1'
//   }
// };

async function requestAllTests() : Promise<Array<{name : string, id : string}>> {

  const response = await fetch(`http://localhost:3000/api/test`, {cache: "no-store"})
  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }
  return response.json();
}

type QuestionItem = {
  question: string;
  alternativesNumber?: number;
  options: {
    name: string;
    id: string;
  }[];
};



async function loadQuestion(test: {name : string, id : string}) : Promise<QuestionItem[]> {
  const response = await fetch(`http://localhost:3000/api/test/${test.id}`, {cache: "no-store"})
  if (!response.ok) {
    const message = `An error has occurred  : ${response.status}`;
  }

  return response.json();
}

async function onQuestionSelected(question : {}) {

}


const Dashboard: React.FC<{ params: { id: string } }> = ({ params }) => {

  const [options, setOptions] = useState<Array<{name : string, id : string}> | null>(null);

  const [activeTest, setActiveTest] = useState<{
    questionItem : QuestionItem,
    solved : boolean
  }[]>([]);

  useEffect(() => {
    console.log({activeTest: options})
  }, [options])

  useEffect(() => {
    requestAllTests().then(el => {
      setOptions(el)
    }).catch(err => {
      console.error(err)
    })

  }, [])

  const id = useSearchParams().get('id')


  return (
    <div className="flex">
      <Sidebar options={options} onOptionSelected={(test : {name : string, id : string}) => {
        loadQuestion(test).then(response => {
          if (!response) {
            const message = `An error has occurred`;
            throw new Error(message);
          }

          setActiveTest(response.map((questionItem: any) => ({questionItem, solved : false})))
        }).catch(err => {
          const message = err.message;
          if (!message) {
            const message = `An error has occurred`;
            throw new Error(message);
          } 
          
          if (err.response) {
            const message = `An error has occurred: ${err.response.status}`;
            throw new Error(message);
          }
        })
      }} />
      <div className="flex-grow">
        <TestDashboard activeTest={activeTest} onQuestionSelected={onQuestionSelected} />
      </div>
    </div>
  );
}

export default Dashboard;
