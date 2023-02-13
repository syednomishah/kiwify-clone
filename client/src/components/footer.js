import { Box } from '@mui/material'
import React from 'react'

export default function Footer() {
  return (
    <Box className="border-t border-gray-200 text-gray-700 px-12 flex justify-between items-center py-5">
        <div className="logo flex text-xs text-gray-500 items-center space-x-3">
            <img className="w-24" src="https://assets.kiwify.com.br/extra/footer-kiwify-gray.png" />
            <p>
                Copyright © 2021 Kiwify.
            </p>
        </div>
        <div className="link text-gray-500 text-xs space-x-3 flex items-center">
            <a className="hover:underline" href="#">My Courses</a>
            <a className="hover:underline" href="#">Help & Support</a>
            <a className="hover:underline flex items-center" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="24px" height="24px" className="mr-1"><path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"></path></svg>
                Switch to Producer Dashboard
            </a>
        </div>
    </Box>
  )
}
