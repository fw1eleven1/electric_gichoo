import { RecoilRoot, useRecoilValue } from 'recoil'
import Url from './components/Url'

function App() {
  return (
    <RecoilRoot>
      <div className="p-4">
        <Url />
      </div>
    </RecoilRoot>
  )
}

export default App
