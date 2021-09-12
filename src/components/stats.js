import React, { useState, useEffect } from 'react'
import { Icon, Statistic } from 'semantic-ui-react'
import axios from "axios"

// ftp url pulled in from .env
const url = process.env.GATSBY_FTPURL


const Stats = () => {
  // axios call to backend
  const fetchData = () => {
    axios({
      method: "post",
      url: `${url}/stats`,
      data: { PASSWORD: process.env.GATSBY_PASSWORD },
    }).then((res) => {
      const data = res.data[0] // works as long as there is one site in the array
      setViews(data.page_visits)
    })
  }

  const [views, setViews] = useState(0)

  useEffect(() => {
    console.log("useEffect ran")
    fetchData()
  }, [])

  return (
    <Statistic.Group size="mini" style={{ position: 'absolute', top: 5, right: 0, margin: 0 }}>
      <Statistic>
        <Statistic.Value><Icon name='globe' />{' '}{views}</Statistic.Value>
        <Statistic.Label>visits</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  )
}

export default Stats
