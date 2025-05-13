--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.2

-- Started on 2025-05-05 10:43:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 29149)
-- Name: agent; Type: TABLE; Schema: public; Owner: ngd_master_user
--

CREATE TABLE public.agent (
    id integer NOT NULL,
    "emailAddress" character varying NOT NULL,
    "firstName" character varying,
    "lastName" character varying,
    "groupcroId" integer
);


ALTER TABLE public.agent OWNER TO ngd_master_user;

--
-- TOC entry 218 (class 1259 OID 29154)
-- Name: agent_id_seq; Type: SEQUENCE; Schema: public; Owner: ngd_master_user
--

CREATE SEQUENCE public.agent_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.agent_id_seq OWNER TO ngd_master_user;

--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 218
-- Name: agent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ngd_master_user
--

ALTER SEQUENCE public.agent_id_seq OWNED BY public.agent.id;


--
-- TOC entry 219 (class 1259 OID 29155)
-- Name: agent_maincro_id_seq; Type: SEQUENCE; Schema: public; Owner: ngd_master_user
--

CREATE SEQUENCE public.agent_maincro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.agent_maincro_id_seq OWNER TO ngd_master_user;

--
-- TOC entry 220 (class 1259 OID 29156)
-- Name: agent_subcro_id_seq; Type: SEQUENCE; Schema: public; Owner: ngd_master_user
--

CREATE SEQUENCE public.agent_subcro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.agent_subcro_id_seq OWNER TO ngd_master_user;

--
-- TOC entry 221 (class 1259 OID 29157)
-- Name: agent_subcro; Type: TABLE; Schema: public; Owner: ngd_master_user
--

CREATE TABLE public.agent_subcro (
    id integer DEFAULT nextval('public.agent_subcro_id_seq'::regclass) NOT NULL,
    "agentId" integer NOT NULL,
    "maincroSubcroId" integer NOT NULL
);


ALTER TABLE public.agent_subcro OWNER TO ngd_master_user;

--
-- TOC entry 222 (class 1259 OID 29161)
-- Name: groupcro_id_seq; Type: SEQUENCE; Schema: public; Owner: ngd_master_user
--

CREATE SEQUENCE public.groupcro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.groupcro_id_seq OWNER TO ngd_master_user;

--
-- TOC entry 223 (class 1259 OID 29162)
-- Name: groupCro; Type: TABLE; Schema: public; Owner: ngd_master_user
--

CREATE TABLE public."groupCro" (
    id integer DEFAULT nextval('public.groupcro_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public."groupCro" OWNER TO ngd_master_user;

--
-- TOC entry 224 (class 1259 OID 29168)
-- Name: group_maincro; Type: TABLE; Schema: public; Owner: ngd_master_user
--

CREATE TABLE public.group_maincro (
    id integer NOT NULL,
    "groupcroId" integer NOT NULL,
    "maincroId" integer NOT NULL
);


ALTER TABLE public.group_maincro OWNER TO ngd_master_user;

--
-- TOC entry 225 (class 1259 OID 29171)
-- Name: group_maincro_id_seq; Type: SEQUENCE; Schema: public; Owner: ngd_master_user
--

CREATE SEQUENCE public.group_maincro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.group_maincro_id_seq OWNER TO ngd_master_user;

--
-- TOC entry 4918 (class 0 OID 0)
-- Dependencies: 225
-- Name: group_maincro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ngd_master_user
--

ALTER SEQUENCE public.group_maincro_id_seq OWNED BY public.group_maincro.id;


--
-- TOC entry 226 (class 1259 OID 29172)
-- Name: hotel; Type: TABLE; Schema: public; Owner: ngd_master_user
--

CREATE TABLE public.hotel (
    id integer NOT NULL,
    "codeHotel" character varying NOT NULL,
    "maincroSubcroId" integer
);


ALTER TABLE public.hotel OWNER TO ngd_master_user;

--
-- TOC entry 227 (class 1259 OID 29177)
-- Name: hotel_id_seq; Type: SEQUENCE; Schema: public; Owner: ngd_master_user
--

CREATE SEQUENCE public.hotel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hotel_id_seq OWNER TO ngd_master_user;

--
-- TOC entry 4920 (class 0 OID 0)
-- Dependencies: 227
-- Name: hotel_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ngd_master_user
--

ALTER SEQUENCE public.hotel_id_seq OWNED BY public.hotel.id;


--
-- TOC entry 228 (class 1259 OID 29178)
-- Name: maincro; Type: TABLE; Schema: public; Owner: ngd_master_user
--

CREATE TABLE public.maincro (
    id integer NOT NULL,
    maincro character varying NOT NULL
);


ALTER TABLE public.maincro OWNER TO ngd_master_user;

--
-- TOC entry 229 (class 1259 OID 29183)
-- Name: subcro; Type: TABLE; Schema: public; Owner: ngd_master_user
--

CREATE TABLE public.subcro (
    id integer NOT NULL,
    subcro character varying NOT NULL,
    label character varying,
    flagcro integer,
    webcallback integer
);


ALTER TABLE public.subcro OWNER TO ngd_master_user;

--
-- TOC entry 230 (class 1259 OID 29188)
-- Name: maincro_subcro_id_seq; Type: SEQUENCE; Schema: public; Owner: ngd_master_user
--

CREATE SEQUENCE public.maincro_subcro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.maincro_subcro_id_seq OWNER TO ngd_master_user;

--
-- TOC entry 4923 (class 0 OID 0)
-- Dependencies: 230
-- Name: maincro_subcro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ngd_master_user
--

ALTER SEQUENCE public.maincro_subcro_id_seq OWNED BY public.subcro.id;


--
-- TOC entry 231 (class 1259 OID 29189)
-- Name: maincro_subcro; Type: TABLE; Schema: public; Owner: ngd_master_user
--

CREATE TABLE public.maincro_subcro (
    id integer DEFAULT nextval('public.maincro_subcro_id_seq'::regclass) NOT NULL,
    "maincroId" integer,
    "subcroId" integer NOT NULL
);


ALTER TABLE public.maincro_subcro OWNER TO ngd_master_user;

--
-- TOC entry 232 (class 1259 OID 29193)
-- Name: hotel_vw; Type: VIEW; Schema: public; Owner: ngd_master_user
--

CREATE VIEW public.hotel_vw AS
 SELECT h.id,
    h."codeHotel",
    h."maincroSubcroId",
    s.subcro,
    m.maincro
   FROM (((public.hotel h
     JOIN public.maincro_subcro ms ON ((h."maincroSubcroId" = ms.id)))
     JOIN public.subcro s ON ((s.id = ms."subcroId")))
     LEFT JOIN public.maincro m ON ((m.id = ms."maincroId")))
  GROUP BY h.id, h."codeHotel", h."maincroSubcroId", s.subcro, m.maincro
  ORDER BY h."codeHotel";


ALTER VIEW public.hotel_vw OWNER TO ngd_master_user;

--
-- TOC entry 233 (class 1259 OID 29197)
-- Name: maincro_id_seq; Type: SEQUENCE; Schema: public; Owner: ngd_master_user
--

CREATE SEQUENCE public.maincro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.maincro_id_seq OWNER TO ngd_master_user;

--
-- TOC entry 4926 (class 0 OID 0)
-- Dependencies: 233
-- Name: maincro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ngd_master_user
--

ALTER SEQUENCE public.maincro_id_seq OWNED BY public.maincro.id;


--
-- TOC entry 234 (class 1259 OID 29198)
-- Name: maincro_vw; Type: VIEW; Schema: public; Owner: ngd_master_user
--

CREATE VIEW public.maincro_vw AS
 SELECT m.id,
    m.maincro,
    s.subcro
   FROM ((public.maincro m
     LEFT JOIN public.maincro_subcro ms ON ((ms."maincroId" = m.id)))
     LEFT JOIN public.subcro s ON ((ms."subcroId" = s.id)))
  ORDER BY m.maincro;


ALTER VIEW public.maincro_vw OWNER TO ngd_master_user;

--
-- TOC entry 235 (class 1259 OID 29202)
-- Name: subcro_id_seq; Type: SEQUENCE; Schema: public; Owner: ngd_master_user
--

CREATE SEQUENCE public.subcro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.subcro_id_seq OWNER TO ngd_master_user;

--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 235
-- Name: subcro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ngd_master_user
--

ALTER SEQUENCE public.subcro_id_seq OWNED BY public.subcro.id;


--
-- TOC entry 236 (class 1259 OID 29396)
-- Name: subcro_vw; Type: VIEW; Schema: public; Owner: ngd_master_user
--

CREATE VIEW public.subcro_vw AS
 SELECT s.id AS "subcroId",
    m.id AS "maincroId",
    ms.id AS "maincroSubcroId",
    m.maincro,
    s.subcro,
    s.label,
    s.flagcro,
    s.webcallback
   FROM ((public.subcro s
     LEFT JOIN public.maincro_subcro ms ON ((s.id = ms."subcroId")))
     LEFT JOIN public.maincro m ON ((ms."maincroId" = m.id)))
  ORDER BY m.maincro, s.subcro;


ALTER VIEW public.subcro_vw OWNER TO ngd_master_user;

--
-- TOC entry 4690 (class 2604 OID 29207)
-- Name: agent id; Type: DEFAULT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.agent ALTER COLUMN id SET DEFAULT nextval('public.agent_id_seq'::regclass);


--
-- TOC entry 4693 (class 2604 OID 29208)
-- Name: group_maincro id; Type: DEFAULT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.group_maincro ALTER COLUMN id SET DEFAULT nextval('public.group_maincro_id_seq'::regclass);


--
-- TOC entry 4694 (class 2604 OID 29209)
-- Name: hotel id; Type: DEFAULT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.hotel ALTER COLUMN id SET DEFAULT nextval('public.hotel_id_seq'::regclass);


--
-- TOC entry 4695 (class 2604 OID 29210)
-- Name: maincro id; Type: DEFAULT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.maincro ALTER COLUMN id SET DEFAULT nextval('public.maincro_id_seq'::regclass);


--
-- TOC entry 4696 (class 2604 OID 29211)
-- Name: subcro id; Type: DEFAULT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.subcro ALTER COLUMN id SET DEFAULT nextval('public.subcro_id_seq'::regclass);


--
-- TOC entry 4890 (class 0 OID 29149)
-- Dependencies: 217
-- Data for Name: agent; Type: TABLE DATA; Schema: public; Owner: ngd_master_user
--

COPY public.agent (id, "emailAddress", "firstName", "lastName", "groupcroId") FROM stdin;
1	frederic.guigui@consulting-for.accor.com	Frédéric	GUIGUI	1
2	gabriel.bruno@accor.com	Gabriel	BRUNO	2
3	youssef.ascour@accor.com	\N	\N	1
4	karim.cheurfi@consulting-for.accor.com	\N	\N	\N
\.


--
-- TOC entry 4894 (class 0 OID 29157)
-- Dependencies: 221
-- Data for Name: agent_subcro; Type: TABLE DATA; Schema: public; Owner: ngd_master_user
--

COPY public.agent_subcro (id, "agentId", "maincroSubcroId") FROM stdin;
1	1	215
2	1	216
3	1	221
4	3	175
5	3	189
6	4	37
7	4	38
8	4	45
\.


--
-- TOC entry 4896 (class 0 OID 29162)
-- Dependencies: 223
-- Data for Name: groupCro; Type: TABLE DATA; Schema: public; Owner: ngd_master_user
--

COPY public."groupCro" (id, name) FROM stdin;
1	Group CA
2	Group UL
3	Group Rest
\.


--
-- TOC entry 4897 (class 0 OID 29168)
-- Dependencies: 224
-- Data for Name: group_maincro; Type: TABLE DATA; Schema: public; Owner: ngd_master_user
--

COPY public.group_maincro (id, "groupcroId", "maincroId") FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	1	6
7	2	10
8	2	11
9	3	7
10	3	9
\.


--
-- TOC entry 4899 (class 0 OID 29172)
-- Dependencies: 226
-- Data for Name: hotel; Type: TABLE DATA; Schema: public; Owner: ngd_master_user
--

COPY public.hotel (id, "codeHotel", "maincroSubcroId") FROM stdin;
1	F620	1
2	B0C0	2
3	C6R1	34
4	H8G0	96
5	H8F4	5
6	H9X4	35
7	B2C0	7
8	H9W5	8
9	J164	9
10	H3A7	10
11	J330	11
12	B135	12
13	B156	13
14	D3U4	14
15	G372	15
16	D3T8	16
17	H8G5	17
18	F4L0	18
19	J2U2	19
20	B390	20
21	B391	21
\.


--
-- TOC entry 4901 (class 0 OID 29178)
-- Dependencies: 228
-- Data for Name: maincro; Type: TABLE DATA; Schema: public; Owner: ngd_master_user
--

COPY public.maincro (id, maincro) FROM stdin;
1	CA1
2	CA2
3	CA3
4	CA4
5	CA8
6	CA9
7	FMT
8	RFS
9	SHT
10	UL1
11	UL3
\.


--
-- TOC entry 4904 (class 0 OID 29189)
-- Dependencies: 231
-- Data for Name: maincro_subcro; Type: TABLE DATA; Schema: public; Owner: ngd_master_user
--

COPY public.maincro_subcro (id, "maincroId", "subcroId") FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	1	6
7	1	7
8	1	8
9	1	9
10	1	10
11	1	11
12	1	12
13	1	13
14	1	14
15	1	15
16	1	16
17	1	17
18	1	18
19	1	19
20	1	20
21	1	21
22	1	22
23	1	23
24	1	24
25	1	25
26	1	26
27	1	27
28	1	28
29	1	29
30	1	30
31	1	31
32	2	4
33	2	1
34	2	3
35	2	6
36	2	8
37	2	9
38	2	10
39	2	12
40	2	13
41	2	14
42	2	15
43	2	32
44	2	18
45	2	33
46	2	34
47	2	24
48	2	25
49	2	35
50	2	36
51	2	30
52	2	31
53	3	4
54	3	37
55	3	38
56	3	39
57	3	40
58	3	41
59	3	42
60	3	43
61	3	44
62	3	45
63	3	46
64	3	47
65	3	48
66	3	49
67	3	50
68	3	51
69	3	52
70	3	53
71	3	54
72	3	55
73	3	56
74	3	57
75	3	58
76	3	59
77	3	60
78	3	61
79	3	62
80	3	63
81	3	64
82	3	65
83	3	66
84	3	67
85	3	68
86	3	69
87	3	70
88	3	71
89	3	72
90	3	73
91	3	74
92	3	75
93	3	76
94	3	77
95	3	78
96	\N	4
97	4	38
98	4	39
99	4	43
100	4	45
101	4	46
102	4	50
103	4	51
104	4	56
105	4	58
106	4	79
107	4	59
108	4	61
109	4	68
110	4	69
111	4	72
112	4	74
113	4	77
114	4	78
115	5	80
116	5	81
117	5	67
118	5	82
119	5	83
120	5	84
121	5	85
122	5	86
123	5	87
124	5	88
125	5	89
126	5	90
127	6	80
128	6	81
129	6	67
130	6	82
131	6	83
132	6	84
133	6	85
134	6	86
135	6	87
136	6	88
137	6	89
138	6	91
139	7	92
140	7	93
141	7	10
142	7	94
143	8	92
144	8	93
145	8	10
146	8	95
147	9	92
148	9	93
149	9	10
150	9	96
151	10	97
152	10	98
153	10	99
154	10	100
155	10	101
156	10	7
157	10	102
158	10	103
159	10	104
160	10	105
161	10	106
162	10	107
163	10	108
164	10	109
165	10	110
166	10	111
167	10	112
168	10	113
169	10	114
170	10	115
171	10	116
172	10	117
173	10	118
174	10	15
175	11	119
176	11	120
177	11	121
178	11	122
179	11	123
180	11	124
181	11	125
182	11	126
183	11	127
184	11	128
185	11	129
186	11	130
187	11	131
188	11	132
189	11	2
190	11	3
191	11	133
192	11	134
193	11	135
194	11	136
195	11	137
196	11	138
197	11	139
198	11	140
199	11	141
200	11	142
201	11	143
202	11	144
203	11	145
204	11	146
205	11	147
206	11	148
207	11	149
208	11	150
209	11	151
210	11	152
211	11	153
212	11	154
213	11	155
214	11	156
215	11	157
216	11	158
217	11	159
218	11	160
219	11	161
220	11	162
221	11	163
222	11	164
223	11	165
224	11	166
225	11	167
226	11	168
227	11	169
228	11	170
\.


--
-- TOC entry 4902 (class 0 OID 29183)
-- Dependencies: 229
-- Data for Name: subcro; Type: TABLE DATA; Schema: public; Owner: ngd_master_user
--

COPY public.subcro (id, subcro, label, flagcro, webcallback) FROM stdin;
1	MUS	MARCHEX US	0	0
2	AIC	ALL INCLUSIVE	0	0
3	EXT	EXTENDED STAY	0	0
4	SWK	SOFITEL WEB UK	0	0
5	SWE	SOFITEL WEB EMEA	0	0
6	TAU	Travel agency US	0	0
7	B1S	SOFITEL AUSTRALIE	0	0
8	TAL	TRAVEL AGENCY LUXE	0	0
9	WCA	Web Callback Canada	0	1
10	RIH	INTER HOTEL BOOKINGS	0	0
11	WUS	WEB CALLBACK ETATS-UNIS	0	1
12	APP	Accor Privileged Partner	0	0
13	AQA	Accor Privileged Partner	0	0
14	GUS	GOOGLE SEARCH US SOFITEL	0	0
15	OSA	Operation speciale Aclub	0	0
16	GUM	GOOGLE SEARCH US MGALLERY	0	0
17	SWP	SOFITEL WEB ASIE PACIFIQUE	0	0
18	MGM	Mgallery Usa/Canada Generic	0	0
19	WSC	WEB CALLBACK SOFITEL CANADA	0	1
20	BAO	MERCURE English USA / CANADA	0	0
21	BAP	NOVOTEL English USA / CANADA	0	0
22	CA1	Generic Line/Moncton/English	0	0
23	FOF	DO NOT USE FAMILY OFFER LINE	0	0
24	HPU	AB TEST HOTEL PAGE LUXURY USA	0	0
25	SWT	SOFITEL WEB/GENERIC US CANADA	0	0
26	B4G	DO NOT USE B4G - LG ENGLISH USA	0	0
27	B4H	GENERIC LINE English USA/CANADA	0	0
28	B4S	DO NOT USE SOFITEL LINE ENGLISH	0	0
29	WSE	WEB CALLBACK SOFITEL ETATS-UNIS	0	1
30	B4W	DO NOT USE ACCORWEB ENGL US CANA	0	0
31	HPC	AB TEST HOTEL PAGE LUXURY CANADA	0	0
32	CA2	Generic Line/Moncton/French	0	0
33	RMC	MERCURE French USA / CANADA	0	0
34	RNC	NOVOTEL French USA / CANADA	0	0
35	RGC	GENERIC LINE FRENCH USA CANADA	0	0
36	RSC	DO NOT USE Sofitel French Canad	0	0
37	9RT	SO PARIS	5	0
38	96U	FAIRMONT JAIPUR	5	0
39	1OP	SOFITEL NEW YORK	5	0
40	96L	FAIRMONT THE PALM	5	0
41	0CM	SOFITEL GOLD COAST	5	0
42	0PA	NOVOTEL NORTH YORK	5	0
43	2TA	"SOFITEL MONTREAL \t"	5	0
44	4Z7	SOFITEL MUMBAI BKC	5	0
45	96F	RAFFLES SEYCHELLES	5	0
46	245	SOFITEL PHILADELPHIA	5	0
47	96N	Fairmont Mara Safari	5	0
48	96O	Fairmont Mount Kenya	5	0
49	96P	Fairmont The Norfolk	5	0
50	C9S	FAIRMONT EL SAN JUAN	5	0
51	2JH	SOFITEL WASHINGTON DC	5	0
52	BUB	FAIRMONT RAMLA RIYADH	5	0
53	CD3	FAIRMONT WINDSOR PARK	5	0
54	4SC	SOFITEL LONDON GATWICK	5	0
55	51P	SOFITEL DUBAI THE PALM	5	0
56	5S4	SOFITEL DUBAI DOWNTOWN	5	0
57	AS2	RAFFLES LONDON THE OWO	5	0
58	BRC	NOVOTEL MIAMI BRICKELL	5	0
59	CNN	BERKELEY PARK MGALLERY	5	0
60	COG	CASA FAENA MIAMI BEACH	5	0
61	CYD	HOTEL BELMONT MGALLERY	5	0
62	4SM	SOFITEL LONDON HEATHROW	5	0
63	CA3	Cluster/Moncton/English	5	0
64	CNZ	FAENA HOTEL MIAMI BEACH	5	0
65	0ZZ	SOFITEL PARIS LE FAUBOURG	5	0
66	B6Q	HOTEL CHADSTONE MELBOURNE	5	0
67	C92	21C MUSEUM HOTEL ST LOUIS	5	0
68	CUW	ORIENT EXPRESS LA MINERVA	5	0
69	72C	SOFITEL LEGEND CASCO VIEJO	5	0
70	D83	THE PARAGON HOTEL SANTA FE	5	0
71	C0H	GEM FOREST NAIROBI MGALLERY	5	0
72	D7N	HOTEL ANDRA SEATTLE MGALLERY	5	0
73	0IF	SOFITEL PARIS LE SCRIBE OPERA	5	0
74	0KX	NOVOTEL NEW YORK TIMES SQUARE	5	0
75	100	SOFITEL PARIS ARC DE TRIOMPHE	5	0
76	25H	SOFITEL BALTIMORE TOUR EIFFEL	5	0
77	AQ1	FAIRMONT ROYAL PALM MARRAKECH	5	0
78	965	LE ROYAL MONCEAUX RAFFLES PARIS	5	0
79	CA4	Cluster/Moncton/French	5	0
80	BRU	21C MUSEUM HOTEL DURHAM	5	0
81	BRN	21C MUSEUM HOTEL CHICAGO	5	0
82	BRP	21C MUSEUM HOTEL NASHVILLE	5	0
83	BRW	21C MUSEUM HOTEL LEXINGTON	5	0
84	BRM	21C MUSEUM HOTEL DES MOINES	5	0
85	BRQ	21C MUSEUM HOTEL LOUISVILLE	5	0
86	BRT	21C MUSEUM HOTEL CINCINNATI	5	0
87	BRR	21C MUSEUM HOTEL BENTONVILLE	5	0
88	BRV	21C MUSEUM HOTEL KANSAS CITY	5	0
89	BRO	21C MUSEUM HOTEL OKLAHOMA CITY	5	0
90	CA8	Cluster 21C / Moncton / English	5	0
91	CA9	Cluster 21C / Moncton / French	5	0
92	TEC	FRS OUTAGE	0	0
93	PTS	BOOKINGS WITH POINTS	0	0
94	FMT	MONCTON/FAIRMONT HOTELS/FR-EN	0	0
95	RFS	MONCTON/RAFFLES HOTELS/FR-EN	0	0
96	SHT	MONCTON/SWISSOTEL HOTELS/FR-EN	0	0
97	UL1	MANILA/GL ASPAC/EN/CALL	0	0
98	B1F	ACCOR FIDJI	0	0
99	P1P	PROMO SYDNEY	0	0
100	BLA	ACCOR AUSTRALIE	0	0
101	1LA	LECLUB PACIFIQUE	0	0
102	PWL	PULLMAN WEB AUSTRALIE	0	1
103	B1N	ACCOR NOUVELLE ZELANDE	0	0
104	B1R	ACCOR VACATION CLUB NZ	0	0
105	WAU	WEB CALLBACK AUSTRALIE	0	1
106	B1D	ADVANTAGE PLUS AUSTRALIE	0	0
107	B1W	ASSISTANCE WEB AUSTRALIE	0	1
108	WCE	WEB CALLBACK ASIE ANGLAIS	0	1
109	GCP	GENERIC - LECLUB PACIFIQUE	0	0
110	SWQ	SOFITEL WEB ASIE PACIFIQUE	0	1
111	ABP	AB TEST HOTEL PAGE AUSTRALIA	0	0
112	B1V	ACCOR VACATION CLUB AUSTRALIE	0	0
113	PWZ	PULLMAN WEB NEW ZEALAND/FIDJI	0	1
114	ABN	AB TEST HOTEL PAGE NEW ZEALAND	0	0
115	MAB	MARCHEX CALL TRACKING AUS GEN.	0	0
116	WPP	WEB CALLBACK PULLMAN PACIFIQUE	0	1
117	WSQ	WEB CALLBACK SOFITEL PACIFIQUE	0	1
118	B1L	ADVANTAGE PLUS NOUVELLE ZELANDE	0	0
119	UL3	MANILA/GL EMEA/EN/CALL	0	0
120	B3I	IBIS UK	0	0
121	B3G	ACCOR UK	0	0
122	B3M	MERCURE UK	0	0
123	B3N	NOVOTEL UK	0	0
124	AET	ACCOR EGYPT	0	0
125	B3X	ACCOR SUEDE	0	0
126	GUK	LG UK ELITE	0	0
127	IWU	IBIS WEB UK	0	1
128	U3A	LECLUB EMEA	0	0
129	GRU	ACCOR RUSSIE	0	0
130	P3X	ACCOR SWEDEN	0	0
131	A1B	LECLUB BRESIL	0	0
132	A8C	LECLUB ITALIE	0	0
133	GTU	ACCOR TURQUIE	0	0
134	A2A	LECLUB ESPAGNE	0	0
135	A2L	"LECLUB FRANCE\t"	0	0
136	A6C	LECLUB POLOGNE	0	0
137	B3D	ACCOR DANEMARK	0	0
138	MWU	MERCURE WEB UK	0	1
139	NWU	NOVOTEL WEB UK	0	1
140	S2P	ACCOR PORTUGAL	0	0
141	A7C	LECLUB PAYS BAS	0	0
142	TUK	TRIPADVISORS UK	0	0
143	WUK	WEB CALLBACK UK	0	1
144	A5C	LECLUB ALLEMAGNE	0	0
145	B4E	ACCOR EMIRAT ENG	0	0
146	TAK	TRAVEL AGENCY UK	0	0
147	AUK	ASSISTANCE WEB UK	0	1
148	B3W	ASSISTANCE WEB UK	0	1
149	ASA	ACCOR SAUDI ARABIA	0	0
150	A4F	IBB/F1 INTERNATIONAL	0	0
151	OLA	ON LINE TRAVEL AGENCY	0	0
152	TTK	AB TEST HOTEL PAGE UK	0	0
153	WAE	WEB CALLBACK ADAGIO UK	0	1
154	ABI	AB TEST HOTEL PAGE ITALY	0	0
155	AWU	ASSISTANCE WEB ADAGIO UK	0	1
156	GAD	GENERIC - ACCOR DANEMARK	0	0
157	P3U	BRAND EMERGENCY LINES UK	0	0
158	TTF	AB TEST HOTEL PAGE FRANCE	0	0
159	WAR	WEB CALLBACK MOYEN ORIENT	0	1
160	ABG	AB TEST HOTEL PAGE GERMANY	0	0
161	ABT	AB TEST HOTEL PAGE IRELAND	0	0
162	B3E	DIRECT LINE IBB HOTEL EMOA	0	0
163	GAW	GENERIC - ASSISTANCE WEB UK	0	0
164	GSK	GOOGLE SMARTPHONE UK BRANDS	0	0
165	GWU	GENERIC - ASSISTANCE WEB UK	0	0
166	WAI	WEB CALLBACK ADAGIO INTERN.	0	1
167	93Y	FAIRMONT LE MANOIR RICHELIEU	0	0
168	GIE	GENERIC-DIRECT LINE IBB EMOA	0	0
169	GSU	GOOGLE SMARTPHONE UK GENERIC	0	0
170	AWE	ASSISTANCE WEB ADAGIO INTERN.	0	1
\.


--
-- TOC entry 4930 (class 0 OID 0)
-- Dependencies: 218
-- Name: agent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ngd_master_user
--

SELECT pg_catalog.setval('public.agent_id_seq', 4, true);


--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 219
-- Name: agent_maincro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ngd_master_user
--

SELECT pg_catalog.setval('public.agent_maincro_id_seq', 1, false);


--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 220
-- Name: agent_subcro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ngd_master_user
--

SELECT pg_catalog.setval('public.agent_subcro_id_seq', 8, true);


--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 225
-- Name: group_maincro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ngd_master_user
--

SELECT pg_catalog.setval('public.group_maincro_id_seq', 10, true);


--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 222
-- Name: groupcro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ngd_master_user
--

SELECT pg_catalog.setval('public.groupcro_id_seq', 3, true);


--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 227
-- Name: hotel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ngd_master_user
--

SELECT pg_catalog.setval('public.hotel_id_seq', 21, true);


--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 233
-- Name: maincro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ngd_master_user
--

SELECT pg_catalog.setval('public.maincro_id_seq', 11, true);


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 230
-- Name: maincro_subcro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ngd_master_user
--

SELECT pg_catalog.setval('public.maincro_subcro_id_seq', 228, true);


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 235
-- Name: subcro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ngd_master_user
--

SELECT pg_catalog.setval('public.subcro_id_seq', 170, true);


--
-- TOC entry 4700 (class 2606 OID 29213)
-- Name: agent agent_pkey; Type: CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.agent
    ADD CONSTRAINT agent_pkey PRIMARY KEY (id);


--
-- TOC entry 4706 (class 2606 OID 29215)
-- Name: agent_subcro agent_subcro_pkey; Type: CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.agent_subcro
    ADD CONSTRAINT agent_subcro_pkey PRIMARY KEY (id);


--
-- TOC entry 4714 (class 2606 OID 29217)
-- Name: group_maincro group_maincro_pkey; Type: CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.group_maincro
    ADD CONSTRAINT group_maincro_pkey PRIMARY KEY (id);


--
-- TOC entry 4709 (class 2606 OID 29219)
-- Name: groupCro groupcro_pkey; Type: CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public."groupCro"
    ADD CONSTRAINT groupcro_pkey PRIMARY KEY (id);


--
-- TOC entry 4719 (class 2606 OID 29221)
-- Name: hotel hotel_pkey; Type: CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.hotel
    ADD CONSTRAINT hotel_pkey PRIMARY KEY (id);


--
-- TOC entry 4724 (class 2606 OID 29223)
-- Name: maincro maincro_pkey; Type: CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.maincro
    ADD CONSTRAINT maincro_pkey PRIMARY KEY (id);


--
-- TOC entry 4733 (class 2606 OID 29225)
-- Name: maincro_subcro maincro_subcro_pkey; Type: CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.maincro_subcro
    ADD CONSTRAINT maincro_subcro_pkey PRIMARY KEY (id);


--
-- TOC entry 4728 (class 2606 OID 29227)
-- Name: subcro subcro_pkey; Type: CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.subcro
    ADD CONSTRAINT subcro_pkey PRIMARY KEY (id);


--
-- TOC entry 4698 (class 1259 OID 29228)
-- Name: agent_id_ix; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE INDEX agent_id_ix ON public.agent USING btree (id);


--
-- TOC entry 4703 (class 1259 OID 29229)
-- Name: agent_idx; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE UNIQUE INDEX agent_idx ON public.agent_subcro USING btree ("agentId", "maincroSubcroId");


--
-- TOC entry 4704 (class 1259 OID 29230)
-- Name: agent_subcro_id_ix; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE INDEX agent_subcro_id_ix ON public.agent_subcro USING btree (id);


--
-- TOC entry 4715 (class 1259 OID 29231)
-- Name: codehotel_idx; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE UNIQUE INDEX codehotel_idx ON public.hotel USING btree ("codeHotel");


--
-- TOC entry 4701 (class 1259 OID 29232)
-- Name: emailaddress_idx; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE UNIQUE INDEX emailaddress_idx ON public.agent USING btree ("emailAddress");


--
-- TOC entry 4711 (class 1259 OID 29233)
-- Name: gm_idx; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE UNIQUE INDEX gm_idx ON public.group_maincro USING btree ("groupcroId", "maincroId");


--
-- TOC entry 4707 (class 1259 OID 29234)
-- Name: groupCro_id_ix; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE INDEX "groupCro_id_ix" ON public."groupCro" USING btree (id);


--
-- TOC entry 4712 (class 1259 OID 29235)
-- Name: group_maincro_id_ix; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE INDEX group_maincro_id_ix ON public.group_maincro USING btree (id);


--
-- TOC entry 4702 (class 1259 OID 29236)
-- Name: groupcroId_ix; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE INDEX "groupcroId_ix" ON public.agent USING btree ("groupcroId");


--
-- TOC entry 4716 (class 1259 OID 29237)
-- Name: hotel_id_idx; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE INDEX hotel_id_idx ON public.hotel USING btree (id);


--
-- TOC entry 4717 (class 1259 OID 29238)
-- Name: hotel_id_ix; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE INDEX hotel_id_ix ON public.hotel USING btree (id);


--
-- TOC entry 4720 (class 1259 OID 29239)
-- Name: maincroSubcroId_ix; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE INDEX "maincroSubcroId_ix" ON public.hotel USING btree ("maincroSubcroId");


--
-- TOC entry 4721 (class 1259 OID 29240)
-- Name: maincro_id_ix; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE INDEX maincro_id_ix ON public.maincro USING btree (id);


--
-- TOC entry 4722 (class 1259 OID 29241)
-- Name: maincro_idx; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE UNIQUE INDEX maincro_idx ON public.maincro USING btree (maincro);


--
-- TOC entry 4729 (class 1259 OID 29387)
-- Name: maincro_notnull_main_idx; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE UNIQUE INDEX maincro_notnull_main_idx ON public.maincro_subcro USING btree ("maincroId", "subcroId") WHERE ("maincroId" IS NOT NULL);


--
-- TOC entry 4730 (class 1259 OID 29386)
-- Name: maincro_null_main_idx; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE UNIQUE INDEX maincro_null_main_idx ON public.maincro_subcro USING btree ("subcroId") WHERE ("maincroId" IS NULL);


--
-- TOC entry 4731 (class 1259 OID 29242)
-- Name: maincro_subcro_id_ix; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE INDEX maincro_subcro_id_ix ON public.maincro_subcro USING btree (id);


--
-- TOC entry 4710 (class 1259 OID 29244)
-- Name: name_idx; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE UNIQUE INDEX name_idx ON public."groupCro" USING btree (name);


--
-- TOC entry 4725 (class 1259 OID 29245)
-- Name: subcro_id_ix; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE INDEX subcro_id_ix ON public.subcro USING btree (id);


--
-- TOC entry 4726 (class 1259 OID 29246)
-- Name: subcro_idx; Type: INDEX; Schema: public; Owner: ngd_master_user
--

CREATE UNIQUE INDEX subcro_idx ON public.subcro USING btree (subcro);


--
-- TOC entry 4735 (class 2606 OID 29247)
-- Name: agent_subcro agent_fk; Type: FK CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.agent_subcro
    ADD CONSTRAINT agent_fk FOREIGN KEY ("agentId") REFERENCES public.agent(id);


--
-- TOC entry 4737 (class 2606 OID 29252)
-- Name: group_maincro group_fk; Type: FK CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.group_maincro
    ADD CONSTRAINT group_fk FOREIGN KEY ("groupcroId") REFERENCES public."groupCro"(id) NOT VALID;


--
-- TOC entry 4734 (class 2606 OID 29257)
-- Name: agent groupcro_fk; Type: FK CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.agent
    ADD CONSTRAINT groupcro_fk FOREIGN KEY ("groupcroId") REFERENCES public."groupCro"(id) NOT VALID;


--
-- TOC entry 4739 (class 2606 OID 29262)
-- Name: hotel maincroSubcro_fk; Type: FK CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.hotel
    ADD CONSTRAINT "maincroSubcro_fk" FOREIGN KEY ("maincroSubcroId") REFERENCES public.maincro_subcro(id) NOT VALID;


--
-- TOC entry 4736 (class 2606 OID 29267)
-- Name: agent_subcro maincroSubcro_fk; Type: FK CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.agent_subcro
    ADD CONSTRAINT "maincroSubcro_fk" FOREIGN KEY ("maincroSubcroId") REFERENCES public.maincro_subcro(id);


--
-- TOC entry 4738 (class 2606 OID 29272)
-- Name: group_maincro maincro_fk; Type: FK CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.group_maincro
    ADD CONSTRAINT maincro_fk FOREIGN KEY ("maincroId") REFERENCES public.maincro(id) NOT VALID;


--
-- TOC entry 4740 (class 2606 OID 29277)
-- Name: maincro_subcro maincro_fk; Type: FK CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.maincro_subcro
    ADD CONSTRAINT maincro_fk FOREIGN KEY ("maincroId") REFERENCES public.maincro(id);


--
-- TOC entry 4741 (class 2606 OID 29282)
-- Name: maincro_subcro subcro_fk; Type: FK CONSTRAINT; Schema: public; Owner: ngd_master_user
--

ALTER TABLE ONLY public.maincro_subcro
    ADD CONSTRAINT subcro_fk FOREIGN KEY ("subcroId") REFERENCES public.subcro(id);


--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO ngd_user;


--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 217
-- Name: TABLE agent; Type: ACL; Schema: public; Owner: ngd_master_user
--

GRANT SELECT ON TABLE public.agent TO ngd_user;


--
-- TOC entry 4915 (class 0 OID 0)
-- Dependencies: 221
-- Name: TABLE agent_subcro; Type: ACL; Schema: public; Owner: ngd_master_user
--

GRANT SELECT ON TABLE public.agent_subcro TO ngd_user;


--
-- TOC entry 4916 (class 0 OID 0)
-- Dependencies: 223
-- Name: TABLE "groupCro"; Type: ACL; Schema: public; Owner: ngd_master_user
--

GRANT SELECT ON TABLE public."groupCro" TO ngd_user;


--
-- TOC entry 4917 (class 0 OID 0)
-- Dependencies: 224
-- Name: TABLE group_maincro; Type: ACL; Schema: public; Owner: ngd_master_user
--

GRANT SELECT ON TABLE public.group_maincro TO ngd_user;


--
-- TOC entry 4919 (class 0 OID 0)
-- Dependencies: 226
-- Name: TABLE hotel; Type: ACL; Schema: public; Owner: ngd_master_user
--

GRANT SELECT ON TABLE public.hotel TO ngd_user;


--
-- TOC entry 4921 (class 0 OID 0)
-- Dependencies: 228
-- Name: TABLE maincro; Type: ACL; Schema: public; Owner: ngd_master_user
--

GRANT SELECT ON TABLE public.maincro TO ngd_user;


--
-- TOC entry 4922 (class 0 OID 0)
-- Dependencies: 229
-- Name: TABLE subcro; Type: ACL; Schema: public; Owner: ngd_master_user
--

GRANT SELECT ON TABLE public.subcro TO ngd_user;


--
-- TOC entry 4924 (class 0 OID 0)
-- Dependencies: 231
-- Name: TABLE maincro_subcro; Type: ACL; Schema: public; Owner: ngd_master_user
--

GRANT SELECT ON TABLE public.maincro_subcro TO ngd_user;


--
-- TOC entry 4925 (class 0 OID 0)
-- Dependencies: 232
-- Name: TABLE hotel_vw; Type: ACL; Schema: public; Owner: ngd_master_user
--

GRANT SELECT ON TABLE public.hotel_vw TO ngd_user;


--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 234
-- Name: TABLE maincro_vw; Type: ACL; Schema: public; Owner: ngd_master_user
--

GRANT SELECT ON TABLE public.maincro_vw TO ngd_user;


--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 236
-- Name: TABLE subcro_vw; Type: ACL; Schema: public; Owner: ngd_master_user
--

GRANT SELECT ON TABLE public.subcro_vw TO ngd_user;


--
-- TOC entry 2092 (class 826 OID 29401)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT ON TABLES TO ngd_user;


-- Completed on 2025-05-05 10:43:52

--
-- PostgreSQL database dump complete
--

