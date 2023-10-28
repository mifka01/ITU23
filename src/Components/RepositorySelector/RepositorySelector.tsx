// @file RepositorySelector component
// @brief Component for selecting a repository
// @author Radim Mifka (xmifka00)
// @date October 2023
interface Props {
  afterSelect: (...args: any[]) => any
}

function RepositorySelector({ afterSelect }: Props) {
  const handleRepositorySelect = async (...args: any[]) => {
    try {
      const response = await window.repository.open()
      afterSelect(response, ...args)
    } catch (error) {
      console.error('Error while selecting a repository:', error)
    }
  }

  return (
    <button className='btn btn-secondary' onClick={handleRepositorySelect}>
      Choose Repository
    </button>
  )
}

export default RepositorySelector
