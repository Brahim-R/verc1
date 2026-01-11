import TerraformMatcher from 'games/TerraformMatcher'

const MiniGames = () => {
  return (
    <div className="px-4 h-[calc(100vh-8rem)] flex flex-col items-center">
      <div className="mb-6 w-full max-w-4xl flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
          Infra-Structure Matcher
        </h1>
        <div className="text-sm text-gray-500">
          Match the Terraform resource to its description!
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center p-8 w-full">
        <TerraformMatcher />
      </div>
    </div>
  )
}

export default MiniGames
