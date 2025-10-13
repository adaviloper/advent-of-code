async function hasFile(path) {
  try {
    const file = await Deno.readFile(path)
    return file
  } catch (error) {
    // console.error(error)
    return null;
  }
}


for await (const directory of Deno.readDir('./')) {
  const file = hasFile(directory.name + '/main.js')
  const file1 = hasFile(directory.name + '/main.1.js')
  const file2 = hasFile(directory.name + '/main.2.js')
  console.log(file)
  if (file || file1 || file2) {
    console.log(directory.name);
  }
}
