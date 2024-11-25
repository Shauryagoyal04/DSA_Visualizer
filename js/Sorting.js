const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  let swaps = []
  
  const partition = (array, left, right) => {
    const pivot = array[left]; // Use the first element as the pivot
    let i = left;
    let j = right;
  
    while (i < j) {
      
      while (array[i] <= pivot && i <= right - 1) {
        i++;
      }
      
      while (array[j] > pivot && j >= left + 1) {
        j--;
      }
      if (i < j) {
        
        [array[i], array[j]] = [array[j], array[i]];
        swaps.push({ firstPostion: i, lastPosition: j });
      }
    }
  
    
    [array[left], array[j]] = [array[j], array[left]];
    swaps.push({ firstPostion: left, lastPosition: j });
    return j;
  };
  
  
  const quick = (array, left, right) => {
    if (left < right) {
      const index = partition(array, left, right);
      quick(array, left, index - 1); 
      quick(array, index + 1, right); 
    }
  };
  
  class SortingAlgorithms {
  
    bubbleSort(array) {
      const swaps = []
      for (let i = array.length-1; i >0; i--) {
  
        
        for (let j = 0; j <=i-1; j++) {
  
          // Checking if the item at present iteration is greather than the next iteration
          if (array[j] > array[j + 1]) {
            // If the condition is true, swap them
            let temp = array[j]
            array[j] = array[j + 1]
            array[j + 1] = temp
            swaps.push({ firstPostion: j, lastPosition: j + 1 })
          }
  
        }
  
      }
  
      return swaps
    }
  
    selectionSort(array) {
      const swaps = []
      let min
      for (let i = 0; i < array.length - 1; i++) {
        min = i
        for (let j = i + 1; j < array.length; j++) {
          if (array[j] < array[min]) {
            min = j
          }
        }
        let temp = array[min]
        array[min] = array[i]
        array[i] = temp
        swaps.push({ firstPostion: min, lastPosition: i })
      }
  
      return swaps
    }
  
    quickSort(array) {
      swaps = []; 
      quick(array, 0, array.length - 1);
      return swaps; 
    }
  }
  let nBars = 20

let numbersBars = document.getElementById('numbersBars')

const stage = document.getElementById('stage')
stage.style.width = `${nBars * 30}px`

const selectAlgorithm = document.getElementById('selectAlgorithm')

const generateBtn = document.getElementById('generateBtn')
const solveBtn = document.getElementById('solveBtn')

let bars = []
let barsDivs = []

const sortingAlgorithms = new SortingAlgorithms({})

const start = () => {
  stage.innerHTML = ''

  bars = Array(nBars).fill(0).map(_ => {
    return {
      width: 20,
      height: Math.floor(Math.random() * 200) + 1
    }
  })

  barsDivs = []

  for (let i = 0; i < bars.length; i++) {
    const bar = document.createElement('div')
    bar.style.width = `${bars[i].width}px`
    bar.style.height = `${bars[i].height}px`
    bar.style.left = `${5 + i * 30}px`
    bars[i] = { ...bars[i], position: i }
    bar.classList.add('bar')
    barsDivs.push(bar)
    stage.appendChild(bar)
  }
}

start()

async function swapBars(barsDivs, i, j) {
  barsDivs[i].style.left = `${5 + j * 30}px`
  barsDivs[i].classList.add('activate')
  barsDivs[j].style.left = `${5 + i * 30}px`
  barsDivs[j].classList.add('activate')
  await sleep(300)
  barsDivs[i].classList.remove('activate')
  barsDivs[j].classList.remove('activate')
  let temp = barsDivs[i]
  barsDivs[i] = barsDivs[j]
  barsDivs[j] = temp
}

const algorithms = [
  sortingAlgorithms.bubbleSort,
  sortingAlgorithms.selectionSort,
  sortingAlgorithms.quickSort
]

const solve = async () => {
  const array = structuredClone(bars.map(el => el.height))

  const swaps = algorithms[selectAlgorithm.selectedIndex](array)

  for (let i = 0; i < swaps.length; i++) {
    if (swaps[i].firstPostion !== swaps[i].lastPosition) {
      await swapBars(barsDivs, swaps[i].firstPostion, swaps[i].lastPosition)
    }
  }
}

generateBtn.addEventListener('click', () => {
  nBars = parseInt(numbersBars.value, 10)
  stage.style.width = `${nBars * 30}px`
  start()
})
solveBtn.addEventListener('click', () => {
  solve()
})
// Overlay functions
function openOverlay() {
  document.getElementById('merge-sort-overlay').style.display = 'flex';
}

function closeOverlay() {
  document.getElementById('merge-sort-overlay').style.display = 'none';
}

