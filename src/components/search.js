/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import { Input } from "semantic-ui-react"

const Search = ({ files, setFiles, backupFiles, loading }) => {
  // console.log(setFiles().toString())
  const filterFiles = (data) => {
    const result = data.filter((item) =>
      item.props.name.toLowerCase().includes(value.toLowerCase())
    )

    setFiles(result)
  }
  const [value, setValue] = useState("")

  useEffect(() => {
    if (files.length && value.length) {
      filterFiles(files) // filters search results
    } else if (!value.length) {
      setFiles(backupFiles) // resets items array
    }
  }, [value])

  useEffect(() => {
    // Clear value if the portal reloads (implies we get a new list of files)
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
