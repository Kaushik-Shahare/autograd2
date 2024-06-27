import QuestionsDB from './questions.js';

const main = async () => {
    try {
        const db = await new QuestionsDB(true);

        // Insert a sample question
        const rowid = await db.insertQuestion('Sample Question', 'print("Hello, World!")', 'Sample stdin', 'Hello, World!');
        console.log(`Inserted question with id: ${rowid}`);

        // Update the sample question
        const changes = await db.updateQuestion(rowid, 'Updated Question', 'print("Hello, Universe!")', 'Updated stdin', 'Hello, Universe!');
        console.log(`Updated question with id: ${rowid}, number of changes: ${changes}`);

        // Retrieve and print all questions
        const rows = await db.getQuestions();
        console.log('Questions:', rows);

        // Close the database connection
        await db.close();
    } catch (err) {
        console.error(err);
    }
};

main();
