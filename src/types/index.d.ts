
import { RollupOptions } from 'rollup';

export declare interface RatResolveOptions {
    /*
     |  MATCHING GLOBs
     |  @since          0.2.0
     |
     |  @values
     |      string      A single glob / picomatch string.
     |      string[]    Multiple glob / picomatch strings.
     */
    match: string | string[];

    /*
     |  ROLLUP OPTIONS PER FILE
     |  @since          0.2.0
     |
     |  @values
     |      RollupOptions       A single set of rollup options.
     |      RollupOptions[]     Multiple sets of rollup options.
     */
    options: RollupOptions | RollupOptions[];

    /*
     |  SHARED ROLLUP OPTIONS
     |  @since          0.2.0
     |
     |  @values
     |      RollupOptions       A single set of rollup options.
     */
    sharedOptions?: RollupOptions;
}
