-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowHistory" (
    "id" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "BorrowHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Book_name_key" ON "Book"("name");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowHistory_userId_bookId_key" ON "BorrowHistory"("userId", "bookId");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowHistory" ADD CONSTRAINT "BorrowHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowHistory" ADD CONSTRAINT "BorrowHistory_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Insert Users
INSERT INTO "User" ("name", "fullName", "createdAt", "updatedAt") VALUES
('jack', 'Jack Dawson', NOW(), NOW()),
('john', 'John Smith', NOW(), NOW()),
('emily', 'Emily Johnson', NOW(), NOW()),
('sophia', 'Sophia Brown', NOW(), NOW()),
('michael', 'Michael Wilson', NOW(), NOW()),
('olivia', 'Olivia Martinez', NOW(), NOW()),
('david', 'David Anderson', NOW(), NOW()),
('emma', 'Emma Thomas', NOW(), NOW());

-- Insert Books (Some books have owners, some are unowned)
INSERT INTO "Book" ("name", "author", "description", "year", "ownerId", "createdAt", "updatedAt") VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'A novel set in the 1920s', '1925-01-01', 1, NOW(), NOW()),
('To Kill a Mockingbird', 'Harper Lee', 'A novel about racial injustice', '1960-01-01', 2, NOW(), NOW()),
('1984', 'George Orwell', 'Dystopian novel', '1949-01-01', 3, NOW(), NOW()),
('Pride and Prejudice', 'Jane Austen', 'Romantic novel', '1813-01-01', NULL, NOW(), NOW()),
('Moby-Dick', 'Herman Melville', 'A story of a whale', '1851-01-01', NULL, NOW(), NOW()),
('War and Peace', 'Leo Tolstoy', 'Historical novel', '1869-01-01', NULL, NOW(), NOW()),
('Crime and Punishment', 'Fyodor Dostoevsky', 'Psychological drama', '1866-01-01', NULL, NOW(), NOW()),
('The Catcher in the Rye', 'J.D. Salinger', 'A novel about teenage rebellion', '1951-01-01', 4, NOW(), NOW()),
('Brave New World', 'Aldous Huxley', 'Dystopian novel', '1932-01-01', NULL, NOW(), NOW()),
('The Hobbit', 'J.R.R. Tolkien', 'Fantasy adventure', '1937-01-01', 5, NOW(), NOW()),
('Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 'Magical adventure', '1997-01-01', NULL, NOW(), NOW()),
('The Lord of the Rings', 'J.R.R. Tolkien', 'Epic fantasy', '1954-01-01', 6, NOW(), NOW()),
('Jane Eyre', 'Charlotte Brontë', 'Gothic novel', '1847-01-01', NULL, NOW(), NOW()),
('Wuthering Heights', 'Emily Brontë', 'Romantic novel', '1847-01-01', NULL, NOW(), NOW()),
('Les Misérables', 'Victor Hugo', 'Historical novel', '1862-01-01', NULL, NOW(), NOW()),
('The Odyssey', 'Homer', 'Ancient Greek epic', '0800-01-01', NULL, NOW(), NOW()),
('The Divine Comedy', 'Dante Alighieri', 'Epic poem', '1320-01-01', NULL, NOW(), NOW()),
('Frankenstein', 'Mary Shelley', 'Science fiction horror', '1818-01-01', NULL, NOW(), NOW()),
('Dracula', 'Bram Stoker', 'Vampire novel', '1897-01-01', NULL, NOW(), NOW()),
('The Picture of Dorian Gray', 'Oscar Wilde', 'Philosophical novel', '1890-01-01', NULL, NOW(), NOW());

-- Insert BorrowHistory (Only for books that are not currently owned)
INSERT INTO "BorrowHistory" ("rating", "userId", "bookId", "createdAt", "updatedAt") VALUES
(4.5, 1, 4, NOW(), NOW()),  -- User 1 borrowed "Pride and Prejudice"
(4.0, 2, 5, NOW(), NOW()),  -- User 2 borrowed "Moby-Dick"
(4.8, 3, 6, NOW(), NOW()),  -- User 3 borrowed "War and Peace"
(4.2, 4, 7, NOW(), NOW()),  -- User 4 borrowed "Crime and Punishment"
(5.0, 5, 9, NOW(), NOW()),  -- User 5 borrowed "Brave New World"
(3.9, 6, 11, NOW(), NOW()), -- User 6 borrowed "Harry Potter and the Sorcerer's Stone"
(4.6, 7, 13, NOW(), NOW()), -- User 7 borrowed "Jane Eyre"
(4.1, 8, 14, NOW(), NOW()), -- User 8 borrowed "Wuthering Heights"
(4.3, 1, 15, NOW(), NOW()), -- User 1 borrowed "Les Misérables"
(4.7, 2, 16, NOW(), NOW()); -- User 2 borrowed "The Odyssey"
