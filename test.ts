const fullName = "Vu Dinh Trong Thang";
const age = 28;
const bio = "";

type personalInfo = {
	fullName: string;
	age: number;
	bio?: string;
};

const object: personalInfo = {
	fullName: fullName,
	age: age,
};

console.log(object);
