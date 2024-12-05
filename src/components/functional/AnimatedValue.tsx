import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
import merge from "lodash.merge";
import * as animations from "../utils/animations";

function AnimatedValue({
	value,
	animationType = "fadeInUp",
	customAnimate,
}: {
	value: number;
	animationType?: keyof typeof animations;
	customAnimate?: HTMLMotionProps<"span">;
}) {
	const mergedProps = merge(animations[animationType], customAnimate);

	return (
		<AnimatePresence mode="popLayout">
			<motion.span key={value} {...mergedProps}>
				{value}
			</motion.span>
		</AnimatePresence>
	);
}

export default AnimatedValue;
