export default function ActiveStatus({ isActive, content }) {
  return (
    <div className="text-black">
      {isActive ? (
        <div className="flex items-center bg-green-100 px-2 rounded-full font-bold gap-2">
          <div>
            <span class="relative flex size-3">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex size-3 rounded-full bg-green-500"></span>
            </span>
          </div>
          <p>{content ? content : ""}</p>
        </div>
      ) : (
        <div className="flex items-center bg-red-100 px-2 rounded-full font-bold gap-2">
          <div>
            <span class="relative flex size-3">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span class="relative inline-flex size-3 rounded-full bg-red-500"></span>
            </span>
          </div>
          <p>{content ? content : ""}</p>
        </div>
      )}
    </div>
  );
}
