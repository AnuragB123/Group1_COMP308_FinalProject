import studentResolvers from  "./studentResolver.js";
import courseResolvers from './courseResolver.js';

export default { ...studentResolvers, ...courseResolvers }