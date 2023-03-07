export function MoveBlock(options) {
    const core = {
      init() {
        this.block = this.isString(options.singleBlock) ? document.querySelector(options.singleBlock) : options.singleBlock;
        this.breakpoints = options.breakpoints;
        this.mediaQuery;
        this.setMedia()
      },
      setMedia() {
        this.breakpoints.forEach(point => {
          const { solution } = point;
          let mediaQuery = window.matchMedia(`${solution}`);
          if(mediaQuery.matches) this.checkMethod(point)
          mediaQuery.addEventListener('change', function(e) {
            if(e.matches) this.checkMethod(point)
          }.bind(this))
        })
      },
      checkMethod(point) {
        const { method, target, elems, clearTarget } = point;
        let elemToPaste = elems ? elems : [this.block] 
        switch (method) {
          case 'append':
            target.append(...elemToPaste);
            break;
          case 'prepend':
            target.prepend(...elemToPaste);
            break;
          case 'after':
            target.after(...elemToPaste);
            break;
          case 'before':
            target.before(...elemToPaste);
            break;
          default:
            target.replaceWith(...elemToPaste);
            break;
        }
      },
      isString(arg) {
        return typeof arg === "string";
      },
    }
    core.init()
  }
