export function getIndicesOf(search: string, input: string) {
  var searchStrLen = search.length;
  if (searchStrLen == 0) {
    return [];
  }
  var startIndex = 0,
    index,
    indices = [];
  while ((index = input.indexOf(search, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
}
