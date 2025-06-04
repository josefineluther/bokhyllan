export interface BookType {
  book_id: number
  author: string
  title: string
  year: number
  publisher: string
  language: string
  genre: string
  format: string
  description: string
  price: number
  home_page: boolean
  img: string
}

export interface OptionType {
  value: string
  label: string
}
