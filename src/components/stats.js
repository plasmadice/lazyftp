import React from 'react'
import { Statistic } from 'semantic-ui-react'

const Stats = () => {

  return (
    <Statistic.Group size="mini">
      <Statistic>
        <Statistic.Value>999</Statistic.Value>
        <Statistic.Label>These Counters</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>999</Statistic.Value>
        <Statistic.Label>Do Not</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>999</Statistic.Value>
        <Statistic.Label>Work Yet</Statistic.Label>
      </Statistic>
    </Statistic.Group>
  )
}

export default Stats
