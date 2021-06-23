import { Box } from '@chakra-ui/react'
import React, { CSSProperties, FC } from 'react'
import {
  Connection,
  Edge,
  Handle,
  NodeProps,
  Position
} from 'react-flow-renderer'

const targetHandleStyle: CSSProperties = { background: '#555' }
const sourceHandleStyleA: CSSProperties = { ...targetHandleStyle, top: 10 }
const sourceHandleStyleB: CSSProperties = {
  ...targetHandleStyle,
  bottom: 10,
  top: 'auto'
}

const onConnect = (params: Connection | Edge) =>
  console.log('handle onConnect', params)

export const PolySynthNode: FC<NodeProps> = ({ data }) => {
  return (
    <Box>
      <Handle
        type='target'
        position={Position.Left}
        style={targetHandleStyle}
        onConnect={onConnect}
      />
      <div>
        PolySynth Node: <strong>{data.color}</strong>
      </div>
      <input
        className='nodrag'
        type='color'
        onChange={data.onChange}
        defaultValue={data.color}
      />
      <Handle
        type='source'
        position={Position.Right}
        id='a'
        style={sourceHandleStyleA}
      />
      <Handle
        type='source'
        position={Position.Right}
        id='b'
        style={sourceHandleStyleB}
      />
    </Box>
  )
}
