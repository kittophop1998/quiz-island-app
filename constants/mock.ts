export const sessionMock = {
    data: {
        sessionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
}

export interface QuestionDetail {
    questionId: string;
    title: string;
    choices: {
        choiceId: string;
        title: string;
        questionId: string;
        question: string;
    }[];
}

export interface QuestionResponse {
    data: QuestionDetail[];
}

export const questionsMock = {
    data: {
        "questionId": "1",
        "title": "คำถาม",
        "choices": [
            {
                "choiceId": "1",
                "title": "คำตอบ",
                "questionId": "1",
                "question": "คำถาม",
            },
            {
                "choiceId": "2",
                "title": "คำตอบ",
                "questionId": "1",
                "question": "คำถาม",
            },
            {
                "choiceId": "3",
                "title": "คำตอบ",
                "questionId": "1",
                "question": "คำถาม",
            },
            {
                "choiceId": "4",
                "title": "คำตอบ",
                "questionId": "1",
                "question": "คำถาม",
            }
        ]
    }
}