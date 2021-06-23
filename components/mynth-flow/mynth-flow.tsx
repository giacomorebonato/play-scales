import ReactFlow from 'react-flow-renderer'
import { PolySynthNode } from './polysynth-node'

const nodeTypes = {
  polySynthNode: PolySynthNode
}
const elements = [
  {
    id: '1',
    type: 'polySynthNode',
    data: { label: 'Node 1' },
    position: { x: 250, y: 5 }
  },
  {
    id: '2',
    data: { label: <div>Node 2</div> },
    position: { x: 100, y: 100 }
  },
  { id: 'e1-2', source: '1', target: '2', animated: true }
]

export const MynthFlow = () => (
  <ReactFlow elements={elements} nodeTypes={nodeTypes} />
)
