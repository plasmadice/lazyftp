import React, { useState, useEffect } from "react"
import { Input } from "semantic-ui-react"

const Search = ({ files, setFiles, backupFiles }) => {
  // console.log(setFiles().toString())
  const sortFiles = (data) => {
    // data.forEach((item) => console.log(item.props.name))
    const result = data.filter((item) =>
      item.props.name.toLowerCase().includes(value.toLowerCase())
    )

    setFiles(result)
  }
  const [value, setValue] = useState("")

  useEffect(() => {
    if (files.length && value.length >= 2) {
      sortFiles(files) // filters search results
    } else {
      setFiles(backupFiles) // resets items array
    }
  }, [value])

  return (
    <Input
      icon="search"
      iconPosition="left"
      placeholder="Search/Filter..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      style={{ pointerEvents: "auto" }}
    />
  )
}

export default Search
