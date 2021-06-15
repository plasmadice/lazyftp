/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import { Input } from "semantic-ui-react"

const Search = ({ files, setFiles, backupFiles, loading }) => {
  // console.log(setFiles().toString())
  const sortFiles = (data) => {
    // data.forEach((item) => console.log(item.props.name))
    const result = data.filter((item) =>
      item.props.name.toLowerCase().includes(value.toLowerCase())
    )
    console.log(result)

    setFiles(result)
  }
  const [value, setValue] = useState("")

  useEffect(() => {
    if (files.length && value.length > 0) {
      sortFiles(files) // filters search results
    } else {
      setFiles(backupFiles) // resets items array
    }
  }, [value])

  useEffect(() => {
    if (value.length > 0 && files.length) {
      console.log("triggered")
      sortFiles(files) // filters search results
    }
  }, [backupFiles])

  useEffect(() => {
    // if page changes for any reason
    if (!loading) {
      setValue("")
    }
  }, [loading])

  return (
    <div style={{ float: "left" }}>
      <Input
        action={{
          labelPosition: value.length ? "right" : null,
          icon: value.length ? "remove" : null,
          color: value.length ? "red" : "blue",
          content: value.length ? "Clear" : "Search",
          onClick: () => setValue(""),
        }}
        // actionPosition="right"
        icon="search"
        iconPosition="left"
        placeholder="Search/Filter..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ pointerEvents: "auto" }}
      />
    </div>
  )
}

export default Search
