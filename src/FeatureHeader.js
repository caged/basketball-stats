import React from 'react'
import RangeControl from './RangeControl'

import './FeatureHeader.css'

const FeatureHeader = (props) => {
  return (
    <header className="FeatureHeader">
      <RangeControl min="2" max="100" value="10" label="Perplexity" />
      <RangeControl min="1" max="20" value="5" label="Epsilon" />
    </header>
  )
}

export default FeatureHeader
