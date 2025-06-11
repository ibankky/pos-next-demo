// src/styles/reactSelectStyles.js

const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(59,130,246,0.3)' : 'none',
      '&:hover': { borderColor: '#3b82f6' },
      fontSize: '1rem',
      borderRadius: '0.5rem',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#1f2937',
      fontWeight: '500',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? '#e0f2fe'
        : state.isSelected
        ? '#3b82f6'
        : '#fff',
      color: state.isSelected ? '#fff' : '#1f2937',
      fontWeight: state.isSelected ? '600' : '400',
      cursor: 'pointer',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };
  
  export default selectStyles;
  