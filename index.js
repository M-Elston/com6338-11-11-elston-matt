const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = (poemData) => {
  const poem = poemData[0];
  const { title, author, lines } = poem;
  const makeH2 = makeTag('h2');
  const makeH3 = makeTag('h3');
  const makeEm = makeTag('em');
  const makeP = makeTag('p');
  const authorLine = pipe(
    name =>`by ${name}`,
    makeEm,
    makeH3
  )(author);

const stanzas = lines.reduce((acc, line) => {
  if (line === "") {
    acc.push([]);
  } else {
    if (acc.length === 0) acc.push([]);
    acc[acc.length - 1].push(line);
  }
  return acc;
},[]);

const stanzaHTML = stanzas.map(stanza =>
  makeP(
    stanza.map((line, i) =>
      i === stanza.length - 1 ? line : `${line}<br>`
    ).join('')
  )
).join('');

return `${makeH2(title)}${authorLine}${stanzaHTML}`;
};





// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
