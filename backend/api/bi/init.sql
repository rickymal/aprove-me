CREATE SCHEMA IF NOT EXISTS bi;

CREATE TABLE bi.DimStudent (
    StudentKey SERIAL PRIMARY KEY,
    StudentID UUID,
    Name VARCHAR(255),
    Email VARCHAR(255),
    UserID UUID,
    CreatedAt TIMESTAMP,
    UpdatedAt TIMESTAMP
);

CREATE TABLE bi.DimOrganization (
    OrganizationKey SERIAL PRIMARY KEY,
    OrganizationID UUID,
    Name VARCHAR(255),
    Description TEXT,
    Email VARCHAR(255),
    Website VARCHAR(255),
    Phone VARCHAR(255),
    Logo VARCHAR(255),
    Cover VARCHAR(255),
    LogoURL VARCHAR(255),
    CoverURL VARCHAR(255),
    CreatedAt TIMESTAMP,
    UpdatedAt TIMESTAMP
);

CREATE TABLE bi.DimTest (
    TestKey SERIAL PRIMARY KEY,
    TestID UUID,
    OrganizationID UUID,
    Name VARCHAR(255),
    Description TEXT,
    CreatedAt TIMESTAMP,
    UpdatedAt TIMESTAMP
);

CREATE TABLE bi.DimQuestion (
    QuestionKey SERIAL PRIMARY KEY,
    QuestionID UUID,
    TestID UUID,
    QuestionText TEXT,
    CreatedAt TIMESTAMP,
    UpdatedAt TIMESTAMP
);

CREATE TABLE bi.FactStudentAnswers (
    FactID SERIAL PRIMARY KEY,
    StudentKey INT,
    QuestionKey INT,
    AnswerKey INT,
    AnswerText TEXT,
    IsCorrect BOOLEAN,
    IsExcluded BOOLEAN,
    CreatedAt TIMESTAMP,
    UpdatedAt TIMESTAMP,
    FOREIGN KEY (StudentKey) REFERENCES bi.DimStudent(StudentKey),
    FOREIGN KEY (QuestionKey) REFERENCES bi.DimQuestion(QuestionKey)
);

CREATE TABLE bi.FactQuestionFeedback (
    FactID SERIAL PRIMARY KEY,
    StudentKey INT,
    QuestionKey INT,
    FeedbackText TEXT,
    Duration INT,
    CreatedAt TIMESTAMP,
    UpdatedAt TIMESTAMP,
    FOREIGN KEY (StudentKey) REFERENCES bi.DimStudent(StudentKey),
    FOREIGN KEY (QuestionKey) REFERENCES bi.DimQuestion(QuestionKey)
);
