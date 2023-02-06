import React from 'react'

type HeadingComponentPropTypes = {
  idx: number;
}

const currChain = [
  'Ethereum Mainnet',
  'Polygon Mainnet',
  'Arbitrum Mainnet',
  'Optimism Mainnet'
]

const HeadingChainComponent = ({idx}:HeadingComponentPropTypes) => {
  return (
    <div>
      <div className='text-xl font-bold text-pink-500 text-center'>Chain: {currChain[idx]}</div>
    </div>
  )
}

export default HeadingChainComponent;