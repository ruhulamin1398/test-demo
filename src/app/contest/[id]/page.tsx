import ContestDetails from '@/components/organisms/ContestDetails'
import ContestInfo from '@/components/organisms/ContestInfo'
import FeaturedContests from '@/components/organisms/FeaturedContests'
import PhotographyContestBanner from '@/components/organisms/PhotographyContestBanner'
import React from 'react'

const SingleContest = () => {
  return (
    <div>
      <PhotographyContestBanner/>
      <ContestDetails/>
      <ContestInfo/>
      <FeaturedContests/>
    </div>
  )
}

export default SingleContest
