--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 9.5.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: producer; Type: TABLE; Schema: public; Owner: laurelea
--

CREATE TABLE public.producer (
    id integer NOT NULL,
    name character varying(128) NOT NULL
);


ALTER TABLE public.producer OWNER TO laurelea;

--
-- Name: producer_id_seq; Type: SEQUENCE; Schema: public; Owner: laurelea
--

CREATE SEQUENCE public.producer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.producer_id_seq OWNER TO laurelea;

--
-- Name: producer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: laurelea
--

ALTER SEQUENCE public.producer_id_seq OWNED BY public.producer.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: laurelea
--

CREATE TABLE public.product (
    name character varying(128) NOT NULL,
    id integer NOT NULL,
    yeartype character varying(128),
    rootstock boolean,
    soil text,
    watering text,
    depth character varying(10),
    category character varying(20) NOT NULL
);


ALTER TABLE public.product OWNER TO laurelea;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: laurelea
--

CREATE SEQUENCE public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO laurelea;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: laurelea
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sort; Type: TABLE; Schema: public; Owner: laurelea
--

CREATE TABLE public.sort (
    id integer NOT NULL,
    name character(128) NOT NULL,
    daystoseedlings character varying(10),
    daystoplanting character varying(10),
    vegperiod character varying(30),
    height character varying(10),
    fromstohav character varying(10),
    producer_id integer NOT NULL,
    product_id integer
);


ALTER TABLE public.sort OWNER TO laurelea;

--
-- Name: sort_id_seq; Type: SEQUENCE; Schema: public; Owner: laurelea
--

CREATE SEQUENCE public.sort_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sort_id_seq OWNER TO laurelea;

--
-- Name: sort_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: laurelea
--

ALTER SEQUENCE public.sort_id_seq OWNED BY public.sort.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: laurelea
--

CREATE TABLE public.users (
    id integer NOT NULL,
    user_name character varying(128),
    password character varying(128),
    email character varying(128) NOT NULL,
    true_password character varying(128)
);


ALTER TABLE public.users OWNER TO laurelea;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: laurelea
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO laurelea;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: laurelea
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.producer ALTER COLUMN id SET DEFAULT nextval('public.producer_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.sort ALTER COLUMN id SET DEFAULT nextval('public.sort_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: producer; Type: TABLE DATA; Schema: public; Owner: laurelea
--

COPY public.producer (id, name) FROM stdin;
1	Гавриш
2	Аэлита
\.


--
-- Name: producer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: laurelea
--

SELECT pg_catalog.setval('public.producer_id_seq', 2, true);


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: laurelea
--

COPY public.product (name, id, yeartype, rootstock, soil, watering, depth, category) FROM stdin;
\.


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: laurelea
--

SELECT pg_catalog.setval('public.product_id_seq', 1, false);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (sid, sess, expire) FROM stdin;
0c0e8d05-b0f7-4764-bf93-2b12d558269d	{"cookie":{"originalMaxAge":604799999,"expires":"2021-06-25T12:54:28.695Z","httpOnly":false,"path":"/"},"userName":"Laurelea","userEmail":"laurelea@mail.ru","isAuthenticated":true}	2021-06-25 12:54:29
951074a4-2202-4938-ae73-d51493aafad7	{"cookie":{"originalMaxAge":604800000,"expires":"2021-06-24T11:25:09.615Z","httpOnly":false,"path":"/"},"userName":"Laurelea","userEmail":"laurelea@mail.ru","isAuthenticated":true}	2021-06-24 11:25:10
\.


--
-- Data for Name: sort; Type: TABLE DATA; Schema: public; Owner: laurelea
--

COPY public.sort (id, name, daystoseedlings, daystoplanting, vegperiod, height, fromstohav, producer_id, product_id) FROM stdin;
\.


--
-- Name: sort_id_seq; Type: SEQUENCE SET; Schema: public; Owner: laurelea
--

SELECT pg_catalog.setval('public.sort_id_seq', 1, false);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: laurelea
--

COPY public.users (id, user_name, password, email, true_password) FROM stdin;
95	Laurelea	$2b$10$vJROLd9Yw/BGlIMk9qqt0uYsbYKGtlenDUKUjFmvrY9Xz6beaqnHS	laurelea@mail.ru	qwerty12
96	Slava123	$2b$10$PcpZXSNU2apUKj93WAMm9OcyMZADS.D241gwqHwBycLupF6tU3zpq	slavinizm@yandex.ru	qwerty12
97	Lin1230	$2b$10$te2K3VKg/1GNNjwGTDMekebo2yNDgp4YyUKFvnWmRfDnPQ8TfB3pa	lin@mail.ru	q1234567
98	Lin0000	$2b$10$Euu4QNBGd4tpOOy/a4/76.w/0OzH6SU2w6Vjgg6VI9/09dGdPCFdG	a@aa.a	aaaaaaaa
99	testtest	$2b$10$vVwvvcuCSfWH2mfAkWgg/OIFvlgPQoQNiWRm.L1hZHHG/6ciQMALm	test@test.te	testtest
105	Lin1234	$2b$10$hZt3jg8SsRb7XQ5PEkmRzuI6ycc1ym0EEXd9VZdi78YVtXzV8/bkK	fsd@sdsd.ru	qwerty12
106	Indiana	$2b$10$de7mbbSswxMf8bLKLCyAguQZonpcAx3EG5CLO/G5v68mK6UnACS4G	indi_j@graal.com	johnes00
107	ClaraOswald	$2b$10$zkgg73Fj/uZoXc9LtGhoVOfiM8IJgc3iAd.IWThfXh/Qt/y1CF6Qe	clara@lefoo.ru	doctorNO
108	Rosetyler	$2b$10$RDvosOSXjkaRI7BsVNt4mODsv0/cK7OvXZ6EvAdXpWyjqPTZGgsfS	rose_t@doctor.who	inlovewithdoctor
109	Testtest	$2b$10$PnAKQSoPdwUTNCVMnfU5ZuC3p3Ph42/cn47jidq9sqUtIF3Kbz/6G	test@test.test	testtest
110	dat1234	$2b$10$LHOqXQqgvimbmxLlUKBreedDELmu0eIC25C4PE.FgqfXuR.rUNFi6	ds@sds.ru	qwertyui
111	Igor000	$2b$10$96.0.2HIwn9dGpxF.rNCuerm948obWsN5X.nE9PFTyDYS9BjrQ8NW	igor@igor.igor	igor0000
112	xdfsdfsdf	$2b$10$uPr3fnbmpndEcTp.5x7LOOKPnmu3XKtmz5iPLl.t.k1t.3yMeqL4i	Components@mail.ru	Components
113	Monster	$2b$10$gMA.zzw7BJzrGdu6wS4qXukKe8ayR.y7cbbcfrJx9fLaeMMgIshRm	Monster@Monster.Mons	Monster0
114	Helen124	$2b$10$z673XAk10vaclgM9Ij6g.OJ.LhMeKRZqmcUbOb1WD.7Br5DsAooOm	Helen@Helen.ru	Helen111
115	AllaPug	$2b$10$kkQrpkSqeYn5PE1PEfjwBepoIatrqWz/w9Oh45xRKnNtoDZxdRvny	zaika@alla.com	zaika456
116	OolongTea	$2b$10$4SXWQlK5LAkoBbRF1OgDKeXzc4kKAy8.3pGeD2etBRlRXPwnRKuh.	OolongTea@te.at	OolongTea
117	sdsddsds	$2b$10$ZU8h6nD5g9EJvKUwD5BBu.yMfTKbPfIA11bCF0Q0/oNlL2jAH74Eq	sdsddsds@mail.ru	sdsddsds
118	cristall	$2b$10$XD.bzfjVVT6gFbljvPUJbOgKo8XIQMf9Xs2Dy6MRY6zy3Vr0AlApa	cristall@mail.ru	cristall
119	angelique	$2b$10$f0FJK/klLKZUL8Uz8iEygegsV/.vJfpq00AlnFytFqwKZtNpJoXkC	angelique@ma.ru	angelique
120	classique	$2b$10$4MvcaX/AZ1lZl4OtwDrh/upZtZPVSP.NAqyX5TWOJNXTkvcpRcauG	classique@mu.mu	classique
121	Houellebecq	$2b$10$DPfp41Ya/dksKtqwiTxVRegyKlFmKSpSPzup1SXRne1gC4IAZ.OGi	Houellebecq@Houellebecq.fr	Houellebecq
\.


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: laurelea
--

SELECT pg_catalog.setval('public.users_id_seq', 121, true);


--
-- Name: producer_pkey; Type: CONSTRAINT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.producer
    ADD CONSTRAINT producer_pkey PRIMARY KEY (id);


--
-- Name: product_pkey; Type: CONSTRAINT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: sort_pkey; Type: CONSTRAINT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.sort
    ADD CONSTRAINT sort_pkey PRIMARY KEY (id);


--
-- Name: users_email_key; Type: CONSTRAINT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users_email_key1; Type: CONSTRAINT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- Name: users_email_key2; Type: CONSTRAINT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- Name: users_email_key3; Type: CONSTRAINT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);


--
-- Name: users_pkey; Type: CONSTRAINT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_user_name_key; Type: CONSTRAINT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_name_key UNIQUE (user_name);


--
-- Name: users_user_name_key1; Type: CONSTRAINT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_name_key1 UNIQUE (user_name);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.sessions USING btree (expire);


--
-- Name: fki_producer_id; Type: INDEX; Schema: public; Owner: laurelea
--

CREATE INDEX fki_producer_id ON public.sort USING btree (producer_id);


--
-- Name: fki_product_id; Type: INDEX; Schema: public; Owner: laurelea
--

CREATE INDEX fki_product_id ON public.sort USING btree (product_id);


--
-- Name: producer_name; Type: INDEX; Schema: public; Owner: laurelea
--

CREATE INDEX producer_name ON public.producer USING btree (name);


--
-- Name: producer_id; Type: FK CONSTRAINT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.sort
    ADD CONSTRAINT producer_id FOREIGN KEY (producer_id) REFERENCES public.producer(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: product_id; Type: FK CONSTRAINT; Schema: public; Owner: laurelea
--

ALTER TABLE ONLY public.sort
    ADD CONSTRAINT product_id FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

