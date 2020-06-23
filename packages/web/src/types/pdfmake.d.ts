declare module 'pdfmake/src/standardPageSizes' {
  interface StandardPageSizes {
    [name: string]: number[]
  }
  const standardPageSizes: StandardPageSizes
  export = standardPageSizes
}
