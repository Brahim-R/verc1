const Tutorials = () => {
  return (
    <div className="mx-auto max-w-5xl px-4">
      <h1 className="mb-10 text-4xl font-bold">Guides & Tutorials</h1>

      <div className="space-y-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex cursor-pointer flex-col gap-6 rounded-xl border border-gray-100 bg-white p-6 transition-colors hover:border-indigo-500 md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-500"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-xl font-bold text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              {item}
            </div>
            <div>
              <h3 className="mb-2 text-xl font-bold">
                Getting Started with PixiJS
              </h3>
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                Learn the basics of the PixiJS rendering engine, from setting up
                the stage to creating your first sprite.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>10 min read</span>
                <span>•</span>
                <span className="rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                  Beginner
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tutorials
