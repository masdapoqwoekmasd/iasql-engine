export class DepError {
  message: string
  metadata?: any

  constructor(message: string, metadata?: any) {
    this.message = message;
    this.metadata = metadata;
  }
}

export async function lazyLoader(promiseGenerators: (() => Promise<any>)[]) {
  console.log('Running lazyLoader...');
  // Set up the tracking variables for the promise execution
  let generatorsToRun = [...promiseGenerators]; // Shallow clone to not mutate the input
  // Running at least one time, run every promise in parallel, and mark the failures to attempt
  // a re-run. The loop continues until either all promises resolve successfully, or there are
  // two runs in a row that fail identically, meaning no forward progress is possible and there
  // was an unrecoverable failure, which causes this function to also fail.
  const failures = [];
  do {
    console.log('Starting a loop...');
    const results = await Promise.allSettled(generatorsToRun.map(g => g()));
    const generatorsToRerun = [];
    for (let i = 0; i < results.length; i++) {
      if (results[i].status === 'fulfilled') {
        continue;
      }
      const reason = (results[i] as PromiseRejectedResult).reason;
      const err = new Error((reason ?? 'An unexpected error occurred'));
      err.stack = reason.stack ?? err.stack;
      failures.push(err);
      generatorsToRerun.push(generatorsToRun[i]);
    }
    if (generatorsToRun.length === generatorsToRerun.length) break;
    generatorsToRun = generatorsToRerun;
  } while (generatorsToRun.length > 0);
  console.log('lazyLoader done!');
  // Handle the success and error paths
  if (generatorsToRun.length === 0) {
    return true;
  } else {
    throw new DepError('Forward progress halted. Some promises never resolved', {
      generatorsToRun,
      generatorsSource: generatorsToRun.map(g => g.toString()),
      failures,
    });
  }
}