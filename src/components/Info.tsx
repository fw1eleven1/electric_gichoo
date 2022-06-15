import React, { FunctionComponent } from 'react'
import { useRecoilValue } from 'recoil'
import { urlState } from '../states'

const Info = () => {
  const url = useRecoilValue(urlState)

  return (
    <div className="mt-10">
      <div className="flex">
        <div className="w-1/2">image</div>
        <div className="w-1/2 flex flex-col pr-5">
          <div className="mb-10">
            <label className="block w-full mb-2 ml-1">Price</label>
            <span className="block w-full text-right text-sm pr-2">
              10,000,000
            </span>
            <input
              type="text"
              className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full read-only:bg-gray-100 text-right cursor-default"
              id="price"
              readOnly
              value="11,000,000"
            />
          </div>

          <div className="mb-10">
            <label className="block w-full mb-2 ml-1">Price</label>
            <span className="block w-full text-right text-sm pr-2">
              10,000,000
            </span>
            <input
              type="text"
              className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full read-only:bg-gray-100 text-right cursor-default"
              id="price"
              readOnly
              value="11,000,000"
            />
          </div>

          <div className="mb-10">
            <label className="block w-full mb-2 ml-1">Price</label>
            <span className="block w-full text-right text-sm pr-2">
              10,000,000
            </span>
            <input
              type="text"
              className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full read-only:bg-gray-100 text-right cursor-default"
              id="price"
              readOnly
              value="11,000,000"
            />
          </div>

          <div className="mb-16">
            <label className="block w-full mb-2 ml-1">Price</label>
            <span className="block w-full text-right text-sm pr-2">
              10,000,000
            </span>
            <input
              type="text"
              className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none w-full read-only:bg-gray-100 text-right cursor-default"
              id="price"
              readOnly
              value="11,000,000"
            />
          </div>

          <div>
            <div className="text-right text-sm">
              <div>exchange</div>
              <div>1,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Info
