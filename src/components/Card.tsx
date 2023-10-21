import colors from "@/colors";
import { useRouter } from "next/router";
import { useState } from "react";

/**
 * @connect MainScreen
 * Design of the main per session card
 *
 */
const Card = ({
	title,
	t_kcal,
	t_p,
	t_f,
	t_c,
	session,
	...props
}: {
	title: string;
	children?: any;
	t_kcal: number;
	t_p: number;
	t_f: number;
	t_c: number;
	session: string;
}) => {
	// Session card state
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	const onClick = () => {
		// Go to new item with session as parameter
		router.push("/newItem?session=" + session);
	};

	return (
		<div style={styles.main_wrap}>
			<div style={styles.container}>
				<div onClick={() => setOpen(!open)}>
					<div>
						<div>
							<div>
								{open ? "Close" : "Open"}
								<p style={styles.title}>{title.split("_").join(" ")}</p>
							</div>
							<p style={styles.calories}>
								{t_kcal.toFixed(1)}{" "}
								<span style={styles.calories_span}>kcal</span>
							</p>
						</div>

						<div>
							<div>
								<div>
									<div></div>
									<p style={styles.circle_value}>{t_p.toFixed(1)}g</p>
								</div>
								<div>
									<div></div>
									<p style={styles.circle_value}>{t_f.toFixed(1)}g</p>
								</div>
								<div>
									<div></div>
									<p style={styles.circle_value}>{t_c.toFixed(1)}g</p>
								</div>
							</div>
							<button style={styles.plus} onClick={onClick}>
								<p style={styles.plusp}>+</p>
							</button>
						</div>
					</div>
				</div>

				{open && <div style={styles.children}>{props.children}</div>}
			</div>
		</div>
	);
};

const styles = {
	main_wrap: { margin: 20, marginBottom: 10, marginTop: 0 },
	row_center: { flexDirection: "row", alignItems: "center" },
	center_justify: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	container: {
		padding: 20,
		borderColor: colors.app.dark_100,
		borderRadius: 25,
		borderWidth: 3,
		backgroundColor: "#fff",
	},
	children: {
		marginTop: 15,
		paddingTop: 5,
		borderTopWidth: 2,
		borderTopColor: colors.app.dark_100,
	},
	title: {
		fontSize: 20,
		fontFamily: "Inter-Medium",
		marginLeft: 10,
		color: colors.app.dark_600,
		pTransform: "capitalize",
	},
	calories: {
		fontFamily: "Inter-Medium",
		fontSize: 20,
		color: colors.app.dark_600,
	},
	calories_span: {
		fontFamily: "Inter",
		fontSize: 12,
		color: colors.tailwind.gray._400,
	},
	circle: {
		width: 20,
		height: 20,
		borderRadius: 999,
		borderWidth: 3,
	},
	circle_value: {
		paddingVertical: 6,
		paddingHorizontal: 10,
		color: colors.tailwind.gray._400,
		fontFamily: "Inter",
		fontSize: 15,
		marginRight: 5,
	},
	button: {
		width: 33,
		height: 33,
		backgroundColor: colors.app.green_200,
		borderRadius: 999,
		alignItems: "center",
		justifyContent: "center",
	},
	plus: {
		width: 30,
		height: 30,
		borderRadius: 40,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: colors.tailwind.green._400,
	},
	plusp: {
		color: "white",
		fontSize: 20,
		fontFamily: "Inter",
		fontWeight: "bold",
	},
};

export default Card;
