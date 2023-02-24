import type { NextPage } from "next"

import { HistoryList } from "@/components/history/HistoryList"
import useDaoHistory from "@/hooks/dao/useDaoHistory"
import { useEffect } from "react"
import { Center, Loader } from "@mantine/core"
import NodataMessage from "@/components/common/NodataMsg"
import { useRouter } from "next/router"
import { useDaoExistCheck } from "@/hooks/dao/useDaoExistCheck"
import { useDaoLoad } from "@/hooks/dao/useDaoLoad"
import { FloatingAddButton } from "@/components/contribution/FloatingAddButton"
import { useLocale } from "@/i18n/useLocale"
import { APIClient } from "@/types/APIClient"
import CopyInviteUrl from "@/components/common/CopyInviteUrl"

type props = {
  isWeb3: boolean
}

const History = ({ isWeb3 }: props) => {
  const { t } = useLocale()
  useDaoExistCheck(isWeb3)
  useDaoLoad(isWeb3)
  const router = useRouter()
  const { daoId, projectId } = router.query
  const { daoHistory, daoInfo, load } = useDaoHistory(
    { daoId: daoId as string, projectId: projectId as string },
    isWeb3
  )
  const title = t.History.Title(daoInfo?.name || "DAO")
  const subTitle = t.History.SubTitle(daoInfo?.name || "DAO")
  useEffect(() => {
    if (daoId && projectId) {
      load()
    }
  }, [daoId, projectId])

  // Loading
  if (!daoHistory)
    return (
      <Center>
        <Loader size="lg" variant="dots" />
      </Center>
    )

  // No data
  if (daoHistory.length === 0) return <CopyInviteUrl />

  return (
    <div>
      <HistoryList data={daoHistory} title={title} subTitle={subTitle} />
      <FloatingAddButton />
    </div>
  )
}

export async function getServerSideProps(context: { query: { daoId: string } }) {
  // Fetch data from external API
  const apiClient = new APIClient()
  let isWeb3: boolean = true
  const res = await apiClient.post("/getIsWeb3", { daoId: context.query.daoId })
  if (res) {
    isWeb3 = res.data
  }
  // Pass data to the page via props
  return { props: { isWeb3 } }
}

export default History
