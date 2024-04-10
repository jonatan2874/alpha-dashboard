const Group = ({ item, children }) => {
  return (
    <div key={item.id}>
      <li key={item.id} className='mt-8' >
        <div className='flex flex-col text-sm  py-2 px-4'>
          <span className='text-lg text-primary'>{item.title}</span>
          <span className='text-xs text-gray-500'>{item.subtitle}</span>
        </div>
      </li>
      {children}
    </div>
  )
}

export default Group;
