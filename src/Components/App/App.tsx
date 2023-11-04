import Menu from 'components/Menu'

function App() {
  // dunno about this
  document.body.classList.add('bg-darkpurple')
  document.body.classList.add('text-white')

  return (
    <>
      <div className='container-fluid min-vh-100 d-flex flex-column'>
        <div className='row'>
          <Menu />
        </div>
        <div className='row text-center flex-grow-1'>
          <div className='d-flex flex-column col-2'>
            <div className='row h-50 border border-1 border-davygray'>
              <div>STATUS</div>
            </div>
            <div className='row h-50 border border-1 border-top-0 border-davygray'>
              <div>REPO</div>
            </div>
          </div>
          <div className='col-8 d-flex flex-column bg-gunmetal'>
            <div className='row h-75 border border-1 border-start-0 border-davygray'>
              <div>
                <div className='row border bg-darkpurple border-0 border-bottom border-davygray text-start'>
                  <div>HEADER</div>
                </div>
                <div>DIFF</div>
              </div>
            </div>
            <div className='row h-25 border border-1 border-top-0 border-start-0 border-davygray'>
              <div>
                <div className='row border bg-darkpurple border-0 border-bottom border-davygray text-start'>
                  <div>HEADER</div>
                </div>
                <div>LOG</div>
              </div>
            </div>
          </div>
          <div className='d-flex flex-column col-2'>
            <div className='row h-50 border border-1 border-start-0 border-davygray'>
              <div>HISTORY</div>
            </div>
            <div className='row h-50 border border-1 border-top-0 border-start-0 border-davygray'>
              <div>STASH</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
