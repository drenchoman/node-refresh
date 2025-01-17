const authors = [
  { id: 1, name: 'Oscar' },
  { id: 2, name: 'Katelyn' },
  { id: 3, name: 'Dylan' },
];

async function getAuthorById(authorId) {
  return authors.find((author) => author.id == authorId);
}

module.exports = { getAuthorById };
