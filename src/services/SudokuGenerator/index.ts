
export class SudokuGenerator {
	private mat!: number[][]; // int
  private solvedMat!: number[][]; // int
	private N!: number; // int
	// number of columns/rows.
	private SRN!: number; // int
	// square root of N
	private K!: number; // int
	// No. Of missing digits

	// Constructor
	constructor(N: number, K: number) {
		this.N = Math.trunc(N);
		this.K = Math.trunc(K);

		// Compute square root of N
		const SRNd = Math.sqrt(N); // double
		this.SRN = Math.trunc(SRNd); // int
		this.mat = new Array(this.N).fill(0).map(() => new Array(this.N));
	}

	// Sudoku Generator
	fillValues(): void {
		// Fill the diagonal of SRN x SRN matrices
		this.fillDiagonal();
		// Fill remaining blocks
		this.fillRemaining(0, this.SRN);

    this.setSolvedMat(this.mat.map((item) =>[...item]));
		// Remove Randomly K digits to make game
		this.removeKDigits();
	}

	// Fill the diagonal SRN number of SRN x SRN matrices
	private fillDiagonal(): void {
		for (let i = 0; i < this.N; i = i + this.SRN) {
			// for diagonal box, start coordinates->i==j
			this.fillBox(i, i);
		}
	}
	// Returns false if given 3 x 3 block contains num.
	private unUsedInBox(rowStart: number, colStart: number, num: number): boolean {
		for (let i = 0; i < this.SRN; i++) {
			for (let j = 0; j < this.SRN; j++) {
				if (this.mat[rowStart + i][colStart + j] === num) {
					return false;
				}
			}
		}

		return true;
	}
	// Fill a 3 x 3 matrix.
  private fillBox(row: number, col: number): void {
		let num; // int
    let isUnused;

		for (let i = 0; i < this.SRN; i++) {
			for (let j = 0; j < this.SRN; j++) {
				do {
					num = this.randomGenerator(this.N);
          isUnused =  this.unUsedInBox(row, col, num);

				} while (!isUnused);

        this.mat[row + i][col + j] = num;
			}
		}
	}
	// Random generator
  // int
	private randomGenerator(num: number ): number {
    return Math.floor(Math.random() * num) + 1;;
	}

  // Check if safe to put in cell
  private CheckIfSafe(i: number, j: number, num: number): boolean {
		return this.unUsedInRow(i, num) && this.unUsedInCol(j, num) && this.unUsedInBox(i - i % this.SRN, j - j % this.SRN, num);
	}

	// check in the row for existence
	private unUsedInRow(i: number, num: number): boolean {
		for (let j = 0; j < this.N; j++) {
			if (this.mat[i][j] === num) {
				return false;
			}
		}

		return true;
	}

  // check in the row for existence
	private unUsedInCol(j: number, num: number): boolean {
		for (let i = 0; i < this.N; i++) {
			if (this.mat[i][j] === num) {
				return false;
			}
		}
		return true;
	}
	// A recursive function to fill remaining
	// matrix
	private fillRemaining(i: number, j: number): boolean {
		if (j >= this.N && i < this.N - 1) {
			i = i + 1;
			j = 0;
		}

    if (i >= this.N && j >= this.N) {
			return true;
		}

		if (i < this.SRN) {
			if (j < this.SRN) {
				j = this.SRN;
			}
		} else if (i < this.N - this.SRN) {
			if (j === Math.trunc(i / this.SRN) * this.SRN) {
				j = j + this.SRN;
			}
		} else {
			if (j === this.N - this.SRN) {
				i = i + 1;
				j = 0;

				if (i >= this.N) {
					return true;
				}
			}
		}

		for (let num = 1; num <= this.N; num++) {
			if (this.CheckIfSafe(i, j, num)) {
				this.mat[i][j] = num;

				if (this.fillRemaining(i, j + 1)) {
					return true;
				}

				this.mat[i][j] = 0;
			}
		}
		return false;
	}
	// Remove the K no. of digits to
	// complete game
	private removeKDigits(): void{
		let count = this.K; // int

    while (count !== 0) {
			let cellId = this.randomGenerator(this.N * this.N) - 1; // int
			// System.out.println(cellId);
			// extract coordinates i and j
			let i = Math.trunc(cellId / this.N); // int
			let j = cellId % 9; // int

			if (j !== 0) {
				j = j - 1;
			}

			// System.out.println(i+" "+j);
			if (this.mat[i][j] !== 0) {
				count--;
				this.mat[i][j] = 0;
			}
		}
	}

  public setSolvedMat(newValue: number[][]) {
    this.solvedMat = newValue;
  }

  public getSolvedMat() {
    return this.solvedMat
  }

  public getMat() {
    return this.mat;
  }

  public setMat(newValue: number[][]) {
    this.mat = newValue;
  }
};