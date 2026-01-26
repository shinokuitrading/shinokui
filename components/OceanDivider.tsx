export function OceanDivider() {
    return (
      <div className="w-full flex justify-center my-10">
        <div className="h-px w-24 md:w-40 bg-gradient-to-r from-transparent via-oceanBrown/50 to-transparent relative overflow-hidden">
          <div className="absolute -bottom-px left-1/2 w-8 h-2 -translate-x-1/2">
            <svg
              viewBox="0 0 80 20"
              className="w-full h-full text-oceanBrown/40"
              aria-hidden="true"
            >
              <path
                d="M0 10 Q 10 0 20 10 T 40 10 T 60 10 T 80 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }