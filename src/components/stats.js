import React, { useState } from 'react'
import { Icon, Statistic } from 'semantic-ui-react'
import axios from "axios"

// ftp url pulled in from .env
const url = process.env.GATSBY_FTPURL


const Stats = () => {
  const [views, setViews] = useState(0)

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

  fetchData()

  return (
    <Statistic.Group size="mini" style={{ justifyContent: 'flex-end', paddingRight: '2rem' }}>
      <Statistic>
        <Statistic.Value><Icon name='eye' />{' '}{views}</Statistic.Value>
        <Statistic.Label>visitors</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  )
}

export default Stats
