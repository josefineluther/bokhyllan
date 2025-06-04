import Select from 'react-select'
import type { StylesConfig } from 'react-select'
import type { OptionType } from '../types'

const customStyles: StylesConfig<OptionType, false> = {
  control: (base, state) => ({
    ...base,
    backgroundColor: '#ffffff',
    border: state.isFocused ? '0px' : '0px',
    boxShadow: state.isFocused ? '0px' : '0px',
    fontFamily: 'Arial',
    borderRadius: '0px',
    padding: '0em'
  }),
  option: (base, state) => ({
    ...base,
    fontFamily: 'Arial',
    backgroundColor: state.isSelected ? '#ffe74f' : state.isFocused ? '#ffe74f' : 'white',
    color: '#333333'
  }),
  menu: (base) => ({
    ...base,
    boxShadow: '0px',
    borderRadius: '0px'
  })
}

const genre: OptionType[] = [
  { value: 'Alla genrer', label: 'Alla genrer' },
  { value: 'Samtida skönlitteratur', label: 'Samtida skönlitteratur' },
  { value: 'Deckare', label: 'Deckare' },
  { value: 'Klassiker', label: 'Klassiker' },
  { value: 'Romantik', label: 'Romantik' },
  { value: 'Fantasy', label: 'Fantasy' },
  { value: 'Skräck', label: 'Skräck' }
]

function SelectGenre(props: { onSelect: (genre?: string) => void }) {
  return (
    <Select
      onChange={(selected) => {
        const selectedValue = selected?.value
        props.onSelect(selectedValue)
      }}
      options={genre}
      isSearchable={false}
      styles={customStyles}
      defaultValue={genre[0]}
    />
  )
}

export default SelectGenre
